var express = require("express");
var router = express.Router();

const client = require("../client");

router.get("/", async (req, res, next) => {
    const produtos = await getProdutos();

    const user = global.authTokens[req.cookies["AuthToken"]];

    res.render("index", {
        user,
        produtos,
    });
});

const getProdutos = async () => {
    const response = await fetch("http://localhost:8080/produtos");
    const data = await response.json();
    // console.log(data.data)
    return data;
};

// async function getUsers(client) {
//   try {
//     await client.connect();
//     return await client.db("auth").collection("users").find().toArray();
//   } finally {
//     await client.close();
//   }
// }

module.exports = router;
