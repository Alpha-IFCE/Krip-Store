const env = require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('../client');
const { ObjectId } = require('mongodb');
// const mongoose = require('mongoose');

// mongoose
//     .connect(`mongodb+srv://kripstore:qYbD3LETmY3POpF7@cluster0.fqkpjyz.mongodb.net/`)
//     .catch(e => {
//         console.error('Connection error', e.message)
//     });

// const db = mongoose.connection;

const app = express()
// const produtsRouter = require('./routes/productRouter');

var corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// db.once('open', () => {

// })

client.connect().then(client => {
    const db = client.db('krip');
    const productsColletcion = db.collection('products');
    const categoriesColletcion = db.collection('categories');
    
    app.get('/', (req, res) => {
        res.json({ message: "Welcome to Krip Store" })
    });
    
    app.get('/produtos', async(req, res) => {
        try {                
            const products = await productsColletcion.find().toArray();
    
            if(products.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(products);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }
    });

    app.get('/produto/:produtoId', async(req, res) => {
        try {          
            const produtoId = ObjectId(req.params.produtoId)
            console.log(produtoId)
            const cursor = await productsColletcion.find({_id: produtoId}).toArray();
            
            console.log(cursor)

            const produto = (cursor[0])

            if(produto.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(produto);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }
    });

    app.get('/categorias', async(req, res) => {
        try {        
            const categories = await categoriesColletcion.find().toArray();
    
            if(categories.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(categories);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }
    });

    app.get('/categorias/:category/produtos', async(req,res) => {
        try {    
            const category = req.params.category;

            const productsInCategory = await productsColletcion.find({
                category: category 
            }).toArray();
    
            if(productsInCategory.length === 0) {
                res.status(404).send({ error: "data not found" })
            } else {
                res.status(200).send(productsInCategory);
            }
        } catch (err) {
            res.status(400).send({ error: err });
            console.log(err)
        }

    });
}).catch(console.error).finally(client.close())

/*
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Food Ordering" })
});

app.get('/products', async(req, res) => {
    try {
        await client.connect()

        const db = client.db('krip');
        const productsColletcion = db.collection('products');
        
        const products = await productsColletcion.find().toArray();

        if(products.length === 0) {
            res.status(404).send({ error: "data not found" })
        } else {
            res.status(200).send({ data: products });
        }
    } catch (err) {
        res.status(400).send({ error: err });
        console.log(err)
    } finally {
        await client.close()
    }
})
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});