const env = require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('../client');
const frete = require("frete");
const { ObjectId } = require('mongodb');

const app = express()

var corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

client.connect().then(client => {
    const db = client.db('krip');
    const productsColletcion = db.collection('products');
    const categoriesColletcion = db.collection('categories');
    const cartCollection = db.collection('cart');

    app.get('/', (req, res) => {
        res.json({ message: "Welcome to Krip Store" })
    });

    app.get('/produtos', async (req, res) => {
        try {
            const products = await productsColletcion.find().toArray();

            if (products.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(products);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }
    });

    app.get('/produto/:produtoId', async (req, res) => {
        try {
            const produtoId = ObjectId(req.params.produtoId)
            // console.log(produtoId)
            const cursor = await productsColletcion.find({ _id: produtoId }).toArray();

            // console.log(cursor)

            const produto = (cursor[0])

            if (produto.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(produto);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }
    });

    app.get('/categorias', async (req, res) => {
        try {
            const categories = await categoriesColletcion.find().toArray();

            if (categories.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(categories);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }
    });

    app.get('/produtos/:category', async (req, res) => {
        try {
            const category = req.params.category;

            const productsInCategory = await productsColletcion.find({
                category: category
            }).toArray();

            if (productsInCategory.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(productsInCategory);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }

    });

    app.post('/calcular-frete', async (req, res) => {
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
            .precoPrazo("60040531", function (err, results) {
                if (err) {
                    res.status(400).send({ error: err });
                    console.log(JSON.parse(err))
                } else {
                    res.status(200).send(results)
                }
            });
    });

    app.post('/add-to-cart', async (req, res) => {
        const newCardRegister = req.body;

        try {
            await cartCollection.insertOne(newCardRegister);
            res.send(true);
        } catch (error) {
            console.error(error);
            res.send(error);
        };
    });

    app.post('/remove-from-cart', async (req, res) => {
        const cardRegister = req.body;

        try {
            await cartCollection.deleteOne(cardRegister);
            res.send(true);
        } catch (error) {
            console.error(error);
            res.send(error);
        };
    });

    app.post('/is-on-cart', async (req, res) => {
        const { produtoId, userId } = req.body;

        const result = await cartCollection.find({
            produtoId: produtoId,
            userId: userId
        }).toArray();
        res.send(result);
    });

    app.post('/get-cart', async (req, res) => {
        const { userId } = req.body;

        try {
            const cart = await cartCollection.find({ userId: userId }).toArray();

            console.log('cart')
            console.log(cart)

            const produtosIds = cart.map(item => { return ObjectId(item.produtoId) });
            console.log('produtosIds')
            console.log(produtosIds)

            const produtos = await productsColletcion.find({
                _id: { $in: produtosIds }
            }).toArray();

            console.log('produtos')
            console.log(produtos)

            res.status(200).send(produtos)

        } catch (error) {
            console.error(error);
            res.status(400).send(error);
        };
    })
}).catch(console.error).finally(client.close())

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});