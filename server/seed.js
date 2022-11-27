const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const _ = require('lodash');
const env = require('dotenv').config({ path: '../.env' });

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

async function main(){
    const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.fqkpjyz.mongodb.net/?retryWrites=true&w=majority`;
    const config = {
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000,
        useUnifiedTopology: true
    }
      
    const client = new MongoClient(uri, config)

    try {
        await client.connect();

        const productsCollection = client.db("krip").collection("products");
        const categoriesCollection = client.db("krip").collection("categories");

        resetCollection(productsCollection);
        resetCollection(categoriesCollection);
        
        let categories = ['camisas', 'moletons', 'calças', 'sapatos'].map((category) => { return { name: category } });
        await categoriesCollection.insertMany(categories);

        let imageUrls = [
            'https://cdn.shopify.com/s/files/1/0568/1902/4078/products/product-image-1761492866.jpg?v=1634093006',
            'https://cdn.shopify.com/s/files/1/0535/9527/5424/products/4_ca859c44-a341-4382-a857-d13211a3e8f5_540x.jpg?v=1647064791',
            'https://cdn.shopify.com/s/files/1/1748/2773/products/product-image-1655289000-sw_900x.jpg?v=1638103974',
            'https://cdn.shopify.com/s/files/1/0702/9411/products/Unsad1_600x.jpg?v=1634033890',
            'https://cdn.shopify.com/s/files/1/0021/5629/8301/products/jpeg_19afa529-fdc3-481c-a2d1-36f48cad79bb_540x.jpg?v=1653747098'
        ];

        let products = [];
        for (let i = 0; i < 40; i+=1) {
            let newProduct = {
                name: faker.commerce.productName(),
                rate: faker.datatype.float({min: 0.0, max: 5.0, precision: 0.1}),
                price: faker.commerce.price(),
                category: _.sample(categories).name,
                imageUrl: _.sample(imageUrls)
            };
            products.push(newProduct);
        }
        await productsCollection.insertMany(products);

    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}

main();

async function resetCollection(collection) {
    collection.remove();
}