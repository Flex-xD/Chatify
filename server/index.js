import express from "express";
import connectdb from "./config/config.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import contactsRoutes from "./routes/contactsRoutes.js";
import setupSocekt from "./socket.js"
import messagesRoute from "./routes/messagesRoute.js";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors({
    origin:[process.env.ORIGIN] , 
    methods:["GET" , "POST" , "PUT" , "PATCH" , "DELETE"] ,
    "credentials":true
}))

app.use("/uploads/profiles" , express.static("uploads/profiles"))

app.use(cookieParser());
app.use(express.json());


app.use("/api/auth" , authRoutes);
app.use("/api/contacts" , contactsRoutes);
app.use("/api/messages" , messagesRoute);

const server = app.listen(port ,  () => {
    console.log(`Server running on http://localhost:${port}/`);
    connectdb();
})

setupSocekt(server);