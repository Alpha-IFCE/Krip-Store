require("dotenv").config();
var express = require("express");
var router = express.Router();

const client = require('../client')

router.get("/", function (req, res, next) {
  getUsers(client).then((users) => console.log(JSON.stringify(users)));
  if (req.cookies["AuthToken"]) {
    res.render("index", {
      messageTitle: "Usuário logado",
      welcomeMessage: "Bem vindo a nossa loja!",
      messageIndex: "Logout",
      hrefI: "/logout",
    });
  } else {
    res.render("index", {
      messageTitle: "Faça login",
      welcomeMessage: "Bem vindo a nossa loja! Faça login para acessar outras páginas.",
      messageIndex: "Faça login",
      hrefI: "/login",
    });
  }
});

async function getUsers(client) {
  try {
    await client.connect();
    return await client.db("auth").collection("users").find().toArray();
  } finally {
    await client.close();
  }
}

module.exports = router;
