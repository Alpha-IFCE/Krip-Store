require("dotenv").config();
let express = require("express");
let router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const { MongoClient } = require("mongodb");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.fqkpjyz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

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
