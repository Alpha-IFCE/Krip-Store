require("dotenv").config();
var express = require("express");
var router = express.Router();
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

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString("hex");
};

router.get("/", (req, res, next) => {

    const user = global.authTokens[req.cookies['AuthToken']]
    res.render("login", {
        log: "Login",
        user
    });
});

router.post("/", (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    login(client, email, hashedPassword)
        .then((user) => {
            if (user) {
                const authToken = generateAuthToken();

                // Store authentication token
                global.authTokens[authToken] = user;

                // Setting the auth token in cookies
                res.cookie("AuthToken", authToken);

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
                        to: user.email,
                        subject: "Login",
                        text: `Login efetuado ${user.username}`,
                    })
                    .then(console.log)
                    .catch(console.error);

                res.redirect("/");
            } else {
                res.render("login", {
                    log: "Email ou senha inválidos",
                    user
                });
            }
        })
        .catch(console.error);
});

async function login(client, email, password) {
    try {
        await client.connect();
        const result = await client.db("auth").collection("users").findOne({
            email,
            password,
        });
        if (result) {
            return result;
        } else {
            return false;
        }
    } finally {
        client.close();
    }
}

module.exports = router;
