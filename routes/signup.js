const { v4: uuid } = require('uuid');
require("dotenv").config();
let express = require("express");
let router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const client = require('../client')

let uid

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
};

router.get("/", function (req, res, next) {
    const user = global.authTokens[req.cookies['AuthToken']]

    res.render("signup", {
        reg: "Cadastro",
        user
    });
});

router.post("/", (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    const user = global.authTokens[req.cookies['AuthToken']]

    if (
        password === confirmPassword &&
        username !== "" &&
        email !== "" &&
        password !== "" &&
        confirmPassword !== ""
    ) {
        checkUser(client, email).then(async (checked) => {
            if (checked) {
                res.render("signup", {
                    reg: "User already registered",
                    user
                });
            } else {
                const hashedPassword = getHashedPassword(password);

                await register(client, email, username, hashedPassword);

                res.render("login", {
                    log: "Cadastro completo. Agora faça login",
                    user
                });

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
                        subject: "Email de Cadastro",
                        text: `Congratulations on registering ${username}. To verify your email, click on the link: 127.0.0.1:3000/verify?email=${email}&uid=${uid}`,
                    })
                    .then(console.log)
                    .catch(console.error);

                uid = null
            }
        });
    } else {
        res.render("signup", {
            reg: "Passwords does not match or empty fields",
            user
        });
    }
});

async function register(client, email, username, hashedPassword) {
    uid = uuid()
    try {
        await client.connect();
        await client.db("auth").collection("users").insertOne({
            uid,
            username: username,
            email: email,
            password: hashedPassword,
            verified: false
        });
        console.log(`New registered user`);
    } finally {
        await client.close();
    }
}

async function checkUser(client, email) {
    try {
        await client.connect();
        const result = await client.db("auth").collection("users").findOne({
            email: email,
        });
        if (result !== null) {
            console.log("yes, we have this email");
            return true;
        } else {
            console.log("no, we don't have this email");
            return false;
        }
    } finally {
        await client.close();
    }
}

module.exports = router;
