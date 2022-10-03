require('dotenv').config()
var express = require('express');
var router = express.Router();

const {MongoClient} = require('mongodb');
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.iipdz.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)

router.get('/', function(req, res, next) {
  getUsers(client).then(users => console.log(JSON.stringify(users)))
  if (req.cookies['AuthToken']) {
    res.render('logado');
} else {
    res.render('login', {
        log: 'Faça login para continuar',
    });
}
});


async function getUsers(client){
  try{
    await client.connect()
    return await client.db("auth").collection("users").find().toArray()
  } finally {
    await client.close()  
  }  
}

module.exports = router;
