var express = require("express");
var router = express.Router();

const client = require('../client')

router.get("/", (req, res, next) => {
    const { email, uid } = req.query

    const user = global.authTokens[req.cookies['AuthToken']]

    checkUser(uid).then((result) => {
        if (result.email == email) {
            verifyUser(client, uid, true).catch(console.dir);
            res.render("verificado", {
                log: "Your account has been verified",
                user
            });
        } else {
            res.render("recover", {
                log: "Invalid verification link",
                user
            });
        }
    })
});

async function checkUser(uid) {
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

async function verifyUser(client, filter, newVerification) {
    try {
        await client.connect();
        const resultado = await client
            .db("auth")
            .collection("users")
            .updateOne({ uid: filter }, { $set: { verified: newVerification } });
        console.log(
            `${resultado.matchedCount} document(s) matched the filter, updated ${resultado.modifiedCount} document(s)`
        );
    } finally {
        await client.close();
    }
}

module.exports = router;