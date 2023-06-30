const connectDB = require('../config/db');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static async findById(id) {
        const db = connectDB();
        return db.collection('users').findOne({ _id: id });
    }

    static async findByUsername(username) {
        const db = connectDB();
        return db.collection('users').findOne({ username });
    }

    async save() {
        const db = connectDB();
        await db.collection('users').insertOne(this);
    }
}

module.exports = User;
