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

router.get("/", (req, res, next) => {
    const { email, uid } = req.query

    const user = global.authTokens[req.cookies['AuthToken']]

    verifyUser(uid).then((result) => {
        if (result.email == email) {
            res.render("newpassword", {
                log: "Enter new password",
                email,
                uid,
                user
            });
        } else {
            res.render("recover", {
                log: "Invalid recovery link",
                user
            });
        }
    })
});

router.post("/", (req, res) => {
    const { uid, email, password, confirmPassword } = req.body;

    const user = global.authTokens[req.cookies['AuthToken']]

    if (password === confirmPassword) {
        const hashedPassword = getHashedPassword(password);
        updatePass(client, uid, hashedPassword).catch(console.dir);

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
                subject: "Change password",
                text: `Your password has been changed. if you did that, disregard this warning.`,
            })
            .then(console.log)
            .catch(console.error);

        res.render("login", {
            log: "Complete recovery! Now log in:",
            user
        });
    }
});

async function updatePass(client, filter, newPassword) {
    try {
        await client.connect();
        const resultado = await client
            .db("auth")
            .collection("users")
            .updateOne({ uid: filter }, { $set: { password: newPassword } });
        console.log(
            `${resultado.matchedCount} document(s) matched the filter, updated ${resultado.modifiedCount} document(s)`
        );
    } finally {
        await client.close();
    }
}

async function verifyUser(uid) {
    try {
        await client.connect();
        const result = await client.db("auth").collection("users").findOne({
            uid: uid
        });
        if (result !== null) {
            console.log("beleza");
            return result;
        } else {
            console.log("inválido");
            return false;
        }
    } finally {
        await client.close();
    }
}

module.exports = router;
