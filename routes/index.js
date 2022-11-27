const { response } = require("express");
var express = require("express");
var router = express.Router();

const client = require("../client");


const getData = async() => {
    const camisas = await getCamisas();

    return { products, camisas }
}


// router.get("/", function (req, res, next) {
    
//     getProdutos().then((produtos) => {
//         const produtosForCarousel = produtos.slice(0, 6)

//         if (req.cookies["AuthToken"]) {
//             res.render("index", {
//                 LoginBtnMsg: "Logout",
//                 loginBtnLink: "/logout",
//                 produtos: produtosForCarousel
//             });
//         } else {
//             res.render("index", {
//                 LoginBtnMsg: "Login",
//                 loginBtnLink: "/login",
//                 produtos: produtosForCarousel
//             });
//         }
//     })
    
// });

router.get("/", async (req, res, next) => {
    const produtos = await getProdutos()

    const produtosForCarousel = produtos.slice(0, 6)

    const user = global.authTokens[req.cookies['AuthToken']]

    res.render("index", {
        user,
        produtos: produtosForCarousel
    });
});

const getProdutos = async() => {
    const response = await fetch('http://localhost:8080/produtos')
    const data = await response.json()
    // console.log(data.data)
    return data.data
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
