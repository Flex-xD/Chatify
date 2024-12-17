import mongoose from "mongoose";

const connectdb = async (req , res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to Database : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in ConnnectDB ${error}`);
    }
}

export default connectdb;