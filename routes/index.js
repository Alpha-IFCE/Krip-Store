require("dotenv").config();
var express = require("express");
var router = express.Router();

const { MongoClient } = require("mongodb");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.iipdz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

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
