require("dotenv").config();
const { MongoClient } = require("mongodb");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.fqkpjyz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

module.exports = client