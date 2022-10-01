require('dotenv').config()
var express = require('express');
var router = express.Router();
const crypto = require('crypto')

const {MongoClient} = require('mongodb');
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.iipdz.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)


const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}


router.get('/', function(req, res, next) {
  res.render('login', {
    log: 'Login'
  });
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  login(client, email, hashedPassword).then( (user) => {
    if (user) {
      const authToken = generateAuthToken();

      // Store authentication token
      global.authTokens[authToken] = user;

      // Setting the auth token in cookies
      res.cookie('AuthToken', authToken);
      
      // Redirect user to the protected page
      res.redirect('/');
    } else {
      res.render('login', {
        log: 'Email ou senha inválidos'
      })
    }
  })
});

async function login(client, email, senha) {
  try {
    await client.connect()
    const result = await client.db("auth").collection("users").findOne({
    email: email,
    password: senha
  })
    if (result) {
      return result
    } else {
      return false
    }
  } finally {
    client.close()
  }
}

module.exports = router;
