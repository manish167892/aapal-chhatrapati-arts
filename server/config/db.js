const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aapal-chhatrapati');
        console.error(`MongoDB Connected: ${conn.connection.host}`); // Using error specifically to bypass the suppression script for fundamental startup logs

        mongoose.connection.on('index', (err) => {
            if (err) console.error('MongoDB Index Creation Error:', err);
            else console.error('MongoDB Indexes successfully created.');
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
