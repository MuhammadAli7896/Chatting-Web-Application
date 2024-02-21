const mongoose = require("mongoose");

const connectDB = async () => {
    const DB_URL = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(DB_URL);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with a non-zero status code to indicate an error
    }
};

module.exports = connectDB;
