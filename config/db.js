const { MongoClient } = require('mongodb');
require("dotenv").config();
const mongoURL = process.env.DATABASE_URL;
const dbName = process.env.DATABASE_NAME;

async function connectDB() {
    try {
        const client = new MongoClient(mongoURL);
        await client.connect();
        return client.db(dbName);
    }
    catch (error) {
        throw error.toString();
    }
}

module.exports = connectDB;
