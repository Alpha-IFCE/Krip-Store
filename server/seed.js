const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
const _ = require('lodash');
const env = require('dotenv').config({ path: '../.env' });
const client = require('../client');
const { min } = require('lodash');


async function main(){
    try {
        await client.connect();

        const productsCollection = client.db("krip").collection("products");
        const categoriesCollection = client.db("krip").collection("categories");

        resetCollection(productsCollection);
        resetCollection(categoriesCollection);
        
        let categories = ['camisa', 'moleton', 'calca'].map((category) => { return { name: category } });
        await categoriesCollection.insertMany(categories);

        let imageUrls = [
            'https://cdn.shopify.com/s/files/1/0568/1902/4078/products/product-image-1761492866.jpg?v=1634093006',
            'https://cdn.shopify.com/s/files/1/0535/9527/5424/products/4_ca859c44-a341-4382-a857-d13211a3e8f5_540x.jpg?v=1647064791',
            'https://cdn.shopify.com/s/files/1/1748/2773/products/product-image-1655289000-sw_900x.jpg?v=1638103974',
            'https://cdn.shopify.com/s/files/1/0702/9411/products/Unsad1_600x.jpg?v=1634033890',
            'https://imgaz.staticbg.com/thumb/large/oaupload/ser1/banggood/images/E8/4B/8a1ea197-8dad-400b-9980-2133f91eee84.jpg.webp',
            'https://img.ltwebstatic.com/images3_pi/2022/05/03/165156969418e4724e7d68c5bacc27f94692d593d0_thumbnail_600x.webp'
        ];


        let products = [];
        for (let i = 0; i < 100; i+=1) {
            const price = faker.commerce.price(1, 150, 2, 'R$')
            let newProduct = {
                name: faker.commerce.productName(),
                rate: faker.datatype.float({min: 0.0, max: 5.0, precision: 0.1}),
                description: faker.commerce.productDescription(),
                price,
                promotion: _.sample([0,1,2,3]) === 0 ? faker.commerce.price(
                    (parseFloat(price.slice(2)) * 0.5),
                    (parseFloat(price.slice(2)) * 0.8), 
                    2,
                    'R$'
                ) : "",
                category: _.sample(categories).name,
            };

            if(newProduct.category === 'calca') {
                newProduct.imageUrl = imageUrls[5]
            } else if (newProduct.category === 'moleton') {
                newProduct.imageUrl = imageUrls[4]
            } else {
                newProduct.imageUrl = _.sample(imageUrls.slice(0,3))
            }

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