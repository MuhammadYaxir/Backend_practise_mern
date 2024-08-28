import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

let url = process.env.MONGO_URL;

async function connectDB() {
    try {
        await mongoose.connect(url);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Database not connected",error);
    }
}

export default connectDB;