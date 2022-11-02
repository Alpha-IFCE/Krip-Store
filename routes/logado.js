var express = require('express');
var router = express.Router();

const client = require('../client')

router.get('/', (req, res, next) => {
  getUsers(client).then(users => console.log(JSON.stringify(users)))
  if (req.cookies['AuthToken']) {
    res.render('logado');
  } else {
    res.render('login', {
      log: 'Faça login para continuar',
    });
  }
});


async function getUsers(client) {
  try {
    await client.connect()
    return await client.db("auth").collection("users").find().toArray()
  } finally {
    await client.close()
  }
}

module.exports = router;
