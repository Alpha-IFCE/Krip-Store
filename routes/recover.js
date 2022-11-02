require("dotenv").config();
var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const client = require('../client')


router.get("/", (req, res, next) => {
  res.render("recover", {
    log: "Para recuperar sua senha, digite seu email: ",
    emailTypeRecover: "email",
    submitTypeRecover: "submit"
  });
});

router.post("/", (req, res) => {
  let uid
  const { email } = req.body;

  checkUser(client, email).then((checked) => {
    if (checked) {
      uid = checked.uid

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter
        .sendMail({
          from: emailUser,
          to: email,
          subject: "Alterar senha",
          text: `Segue link para alterar a senha: 127.0.0.1:3000/newpassword?email=${email}&uid=${uid}`,
        })
        .then(console.log)
        .catch(console.error);

      res.render("recover", {
        log: "Email de recuperação de senha enviado",
        emailTypeRecover: "hidden",
        submitTypeRecover: "hidden"
      })
    } else {
      res.render("recover", {
        log: "Email não cadastrado!",
        emailTypeRecover: "email",
        submitTypeRecover: "submit"
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
      return result;
    } else {
      console.log("não, não temos esse email");
      return false;
    }
  } finally {
    await client.close();
  }
}

module.exports = router;
