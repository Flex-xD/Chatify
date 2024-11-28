import mongoose, { mongo } from "mongoose";

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected to :", conn.connection.host);
    } catch (error) {
        console.log(error);
    }
} 