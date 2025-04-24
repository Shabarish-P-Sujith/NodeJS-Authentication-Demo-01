const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME,
        });
        console.log(`MongoDB Connection Successful !!`);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`);
        process.exit(1);
    }
}
module.exports = connectDB;