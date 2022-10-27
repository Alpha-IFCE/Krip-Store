require("dotenv").config();
let express = require("express");
let router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const client = require('../client')


const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

router.get("/", function (req, res, next) {
  res.render("newpassword");
});

router.post("/", (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    const hashedPassword = getHashedPassword(password);
    run(client, email, hashedPassword).catch(console.dir);

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
        subject: "Login",
        text: `Sua senha foi alterada. Caso tenha feito isso, desconsidere este aviso.`,
      })
      .then(console.log)
      .catch(console.error);

    res.render("login", {
      log: "Recuperação completa! Agora faça login:",
    });
  }
});

async function run(client, filter, newValue) {
  try {
    await client.connect();
    const resultado = await client
      .db("auth")
      .collection("users")
      .updateOne({ email: filter }, { $set: { password: newValue } });
    console.log(
      `${resultado.matchedCount} document(s) matched the filter, updated ${resultado.modifiedCount} document(s)`
    );
  } finally {
    await client.close();
  }
}

module.exports = router;
