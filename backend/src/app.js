import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoute.js"

import {connectdb} from "./config/db.js"

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173" ,
    credentials:true
}));

app.use("/api/auth" , authRoutes);
app.use("/api/message" ,  messageRoutes);


app.listen(port , () => {
    console.log(`Server running on PORT:${port}`);
    connectdb();
})
