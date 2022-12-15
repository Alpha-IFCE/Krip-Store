var express = require("express");
var router = express.Router();

router.get('/', async (req, res) => {
    const user = global.authTokens[req.cookies["AuthToken"]];

    if (!user) {
        res.redirect('back');
        return;
    }

    const produtos = await getCart(user._id)

    res.render('cart', {
        user,
        produtos
    })
});

const getCart = async (userId) => {
    const response = await fetch(`http://localhost:8080/get-cart`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ userId })
    });
    const data = await response.json();
    await console.log(data)
    return data
}

const getProdutos = async (userId) => {
    const response = await fetch(`http://localhost:8080/get-cart`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ userId })
    });
    const data = await response.json();
    await console.log(data)
    return data
}



module.exports = router;