import express from "express";
import connectdb from "./config/config.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors({
    origin:[process.env.ORIGIN] , 
    methods:["GET" , "POST" , "PUT" , "PATCH" , "DELETE"] ,
    "credentials":true
}))

app.use(cookieParser());
app.use(express.json());


app.listen(port ,  () => {
    console.log(`Server running on http://localhost:${port}/`);
    connectdb();
})