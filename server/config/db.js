import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Atlas Connected: ${conn.connection.name} at ${conn.connection.host}:${conn.connection.port}`);

    } catch (error) {
        console.log("Mongo ERROR ", error);
        process.exit(1);  // Exit process with failure
    }
}

export default connectDB;
