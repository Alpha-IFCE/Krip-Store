var express = require("express");
var router = express.Router();

const client = require("../client");

const camisas = require('../public/scripts/camisas')

router.get("/", function (req, res, next) {
  getUsers(client).then((users) => console.log(JSON.stringify(users)));
  if (req.cookies["AuthToken"]) {
    res.render("index", {
      LoginBtnMsg: "Logout",
      loginBtnLink: "/logout",
      camisas
    });
  } else {
    res.render("index", {
      LoginBtnMsg: "Login",
      loginBtnLink: "/login",
      camisas
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
