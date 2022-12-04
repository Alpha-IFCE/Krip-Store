const express = require("express");
const router = express.Router();
const frete = require("frete");

router.get("/:produtoId", async (req, res) => {
    const produto = await getProduto(req.params.produtoId);

    const user = global.authTokens[req.cookies["AuthToken"]];

    res.render("product-page", {
        user,
        produto,
    });
});

const getProduto = async (produtoId) => {
    const response = await fetch(`http://localhost:8080/produto/${produtoId}`);
    const data = await response.json();
    // console.log(data);
    return data;
};

router.post("/:produtoId", async (req, res) => {
    const produto = await getProduto(req.params.produtoId);

    const user = global.authTokens[req.cookies["AuthToken"]];

    const cep = req.body.cep;

    await frete()
        .cepOrigem(cep)
        .peso(1)
        .formato(frete.formatos.caixaPacote)
        .comprimento(16)
        .altura(2)
        .largura(11)
        .diametro(1)
        //.maoPropria(frete.maoPropria.nao)
        .valorDeclarado(50)
        //.avisoRecebimento(frete.avisoRecebimento.sim)
        .servico(frete.servicos.sedex)
        .precoPrazo("13466321", function (err, results) {
            console.log("erro: ", err);
            console.log(results);
        });

    // console.log(a)

    res.render("product-page", {
        user,
        produto,
    });
});

module.exports = router;
