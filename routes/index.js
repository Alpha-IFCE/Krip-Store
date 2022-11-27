const { response } = require("express");
var express = require("express");
var router = express.Router();

const client = require("../client");


const getData = async() => {
    const products = await getProducts();
    const camisas = await getCamisas();

    return { products, camisas }
}


router.get("/", function (req, res, next) {
    
    getCamisas().then((camisas) => {
        if (req.cookies["AuthToken"]) {
            res.render("index", {
                LoginBtnMsg: "Logout",
                loginBtnLink: "/logout",
                camisas
            });
        } else {
            res.render("index", {
                LoginBtnMsg: "Login",
                loginBtnLink: "/login",
                camisas
            });
        }
    })
    
});

const getCamisas = async() => {
    const response = await fetch('http://localhost:8080/categories/camisa/products')
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
