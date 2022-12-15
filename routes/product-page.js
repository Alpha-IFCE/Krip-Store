const express = require("express");
const router = express.Router();

router.get("/:produtoId", async (req, res) => {
    const produto = await getProduto(req.params.produtoId);

    const user = global.authTokens[req.cookies["AuthToken"]];
    let isOnCart;
    if (user) {
        isOnCart = await getIsOnCart(req.params.produtoId, user._id);
        isOnCart = isOnCart.length > 0;
    } else {
        isOnCart = false;
    }
    console.log(isOnCart)

    res.render("product-page", {
        user,
        produto,
        isOnCart
    });
});

router.get('/:produtoId/add-to-cart', async (req, res) => {
    const produtoId = req.params.produtoId;

    const user = global.authTokens[req.cookies["AuthToken"]];

    if (!user) {
        res.redirect('/login');
        return;
    }

    await fetch(`http://localhost:8080/add-to-cart`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ produtoId, userId: user._id })
    });

    res.redirect('back');
});

router.get('/:produtoId/remove-from-cart', async (req, res) => {
    const produtoId = req.params.produtoId;

    const user = global.authTokens[req.cookies["AuthToken"]];

    if (!user) {
        res.redirect('/login');
        return;
    }

    await fetch(`http://localhost:8080/remove-from-cart`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ produtoId, userId: user._id })
    });

    res.redirect('back');
});

const getIsOnCart = async (produtoId, userId) => {
    const response = await fetch(`http://localhost:8080/is-on-cart`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ produtoId, userId })
    });
    const data = await response.json();
    await console.log(data)
    return data
}

const getProduto = async (produtoId) => {
    const response = await fetch(`http://localhost:8080/produto/${produtoId}`);
    const data = await response.json();
    // console.log(data);
    return data;
};

module.exports = router;
