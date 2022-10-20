require("dotenv").config();
var express = require("express");
var router = express.Router();


const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const client = require('../client')


router.get("/", function (req, res, next) {
  res.render("recover", {
    log: "Para recuperar sua senha, digite seu email: ",
  });
});

router.post("/", (req, res) => {
  const { email } = req.body;

  checkUser(client, email).then((checked) => {
    if (checked) {
      res.render("newPassword", {
        log: "Email confirmado! Digite sua nova senha:",
        email,
      });
    } else {
      res.render("recover", {
        log: "Email não cadastrado!",
      });
    }
  });
});

async function checkUser(client, email) {
  try {
    await client.connect();
    const result = await client.db("auth").collection("users").findOne({
      email: email,
    });
    if (result !== null) {
      console.log("sim, temos esse email");
      return true;
    } else {
      console.log("não, não temos esse email");
      return false;
    }
  } finally {
    await client.close();
  }
}

module.exports = router;
