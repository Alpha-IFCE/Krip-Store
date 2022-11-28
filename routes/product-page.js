const express = require("express");
const router = express.Router();

router.get('/:produtoId', async(req, res) => {
    const produto = await getProduto(req.params.produtoId);

    const user = global.authTokens[req.cookies['AuthToken']]

    res.render('product-page', {
        user,
        produto
    })

});

const getProduto = async(produtoId) => {
    const response = await fetch(`http://localhost:8080/produto/${produtoId}`)
    const data = await response.json()
    console.log(data)
    return data
}

module.exports = router;