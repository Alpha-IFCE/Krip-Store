// Este arquivo é apenas uma base e teste para o uso do banco de dados que pode não estar incluso na versão final do projeto e, portanto, não possui nenhuma relação com o mesmo //  

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const crypto = require('crypto');

var homeRouter = require('./routes/index');
var livroPageRouter = require('./routes/livro-page');
var loginRouter = require('./routes/login');
var readPageRouter = require('./routes/readpage');
var favoritosPageRouter = require('./routes/favoritos');

var app = express();

app.use('/', homeRouter);
app.use('/index', homeRouter);
app.use('/livro', livroPageRouter);
app.use('/login', loginRouter);
app.use('/readpage', readPageRouter);
app.use('/favoritos', favoritosPageRouter);

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};

const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://dbuser:lma@cluster0.buvbkrm.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

async function registerUser(client, userInfo) {
  try {
    await client.connect()
    await client.db("ProjetoZe").collection("Usuarios").insertOne(userInfo)
  } finally {
    await client.close()
  }
}

async function verifyEmail(client, email) {
  try {
    await client.connect()
    const user = await client.db("ProjetoZe").collection("Usuarios").findOne({
      "email": email
    })

    return user
  } finally {
    await client.close()
  }
}

async function verifyLogin(client, email, password) {
  try {
    await client.connect()
    const user = await client.db("ProjetoZe").collection("Usuarios").findOne({
      "email": email,
      "password": password
    })
    return await user;
  } finally {
    await client.close()
  }
}

async function getUsers(client) {
  try {
    await client.connect()
    const users = await client.db("ProjetoZe").collection("Usuarios").find({}).toArray()
    return users;
  } finally {
    await client.close()
  }
}

// Essa função verifica se há um usuário logado
function isLogged(req) {
  const authToken = req.cookies['AuthToken'];
  return authTokens[authToken] ? true : false
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  getUsers(client)
    .then(users => console.log(JSON.stringify(users)))
    .catch(console.error) // caso de erro
  res.render('index', {
    user: req.user,

  });
});

app.get('/signin', function(req, res) {
  // caso hja algum usuário logado, ele redireciona para o protected
  if (isLogged(req)) {
    res.redirect('/index')
  } else {
    res.render('signin');
  }
});

app.post('/signin', (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (!(name === "" || email === "" || password === "" || confirmPassword === "")) {
    if (password === confirmPassword) {

      // Check if user with the same email is also registered
      // Como a função é async, estou usando Promise
      // Esse .then(function) garante que a requisição esteja terminada
      verifyEmail(client, email).then(function(user) {
        if (user != null) {
          console.log(`Email já existe tente com outro email:\n ${user}`)
          res.render('signin', {
            message: 'Usuario esta registrado.',
            messageClass: 'alert-danger',
          });
        } else {
          const hashedPassword = getHashedPassword(password);

          // Store user into the database if you are using one
          registerUser(client, {
            name: name,
            email: email,
            password: hashedPassword
          })

          console.log("Usuário Registrado")

          res.render('login', {
            message: 'Registro completo faça o login para continuar.',
            messageClass: 'alert-success'
          });
        }
      })
        .catch(console.error) // caso de erro
    } else {
      console.log("Senha informada não coincide.")
      res.render('signin', {
        message: 'Password does not match.',
        messageClass: 'alert-danger'
      });
    }
  } else {
    console.log("Formulário incompleto.")
    res.render('signin', {
      message: 'Fill the form.',
      messageClass: 'alert-danger'
    });
  }
});

app.get('/login', (req, res) => {
  // caso hja algum usuário logado, ele redireciona para o protected
  if (isLogged(req)) {
    res.redirect('/index')
  } else {
    res.render('login');
  }
});

app.get('/favoritos', (req, res) => {

  if (isLogged(req)) {
    res.redirect('/favoritos')
  } else {
    res.redirect('/login');
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  verifyLogin(client, email, hashedPassword).then(user => {

    if (user) {
      const authToken = generateAuthToken();

      // Store authentication token
      authTokens[authToken] = user;

      // Setting the auth token in cookies
      res.cookie('AuthToken', authToken);

      // Redirect user to the protected page
      res.redirect('/index');
    } else {
      res.render('login', {
        message: 'nome ou senha invalidas',
        messageClass: 'alert-danger'
      });
    }
  })
    .catch(console.error) // caso de erro
});

app.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];
  req.user = authTokens[authToken];
  next();
});
// só abre se estiver logado
app.get('/index', (req, res) => {
  res.render('index', {
    user: req.user,

  });
}
);

app.get('/readpage', (req, res) => {
  if (isLogged(req)) {
    res.redirect('/readpage')
  } else {
    res.redirect('/login');
  }
});

// apaga os cookies e faz logout
app.get('/logout', (req, res) => {
  res.clearCookie("AuthToken")
  res.redirect('/')
})


module.exports = app;
