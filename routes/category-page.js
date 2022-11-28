const { response } = require("express");
var express = require("express");
var router = express.Router();

const client = require("../client");

router.get("/:category", async (req, res, next) => {
    const categoria = req.params.category
    const produtos = await getProdutos(categoria.slice(0,-1))

    const user = global.authTokens[req.cookies['AuthToken']]

    res.render('category-page', {
        produtos,
        user
    });
});

const getProdutos = async(categoria) => {
    const response = await fetch(`http://localhost:8080/produtos/${categoria}`)
    const data = await response.json()
    // console.log(data.data)
    return data
}

// async function getUsers(client) {
//   try {
//     await client.connect();
//     return await client.db("auth").collection("users").find().toArray();
//   } finally {
//     await client.close();
//   }
// }

module.exports = router;
