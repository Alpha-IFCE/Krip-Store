const { response } = require("express");
var express = require("express");
var router = express.Router();

const client = require("../client");

router.get('/', async (req, res, next) => {
    const produtos = await getProdutos()

    const user = global.authTokens[req.cookies['AuthToken']]

    res.render('search-page', {
        produtos,
        user
    });
});

router.get("/:category", async (req, res, next) => {
    const categoria = req.params.category
    const produtos = await getProdutosByCategory(categoria.slice(0, -1))

    const user = global.authTokens[req.cookies['AuthToken']]

    res.render('search-page', {
        produtos,
        user
    });
});

const getProdutosByCategory = async (categoria) => {
    const response = await fetch(`http://localhost:8080/produtos/${categoria}`)
    const data = await response.json()
    // console.log(data.data)
    return data
}

const getProdutos = async () => {
    const response = await fetch(`http://localhost:8080/produtos`)
    const data = await response.json()
    // console.log(data.data)
    return data
}


module.exports = router;
