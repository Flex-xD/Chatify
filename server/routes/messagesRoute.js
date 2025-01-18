import {Router} from "express"; 
import {verifyToken} from "../middlewares/authMiddleware.js";
import { getMessage } from "../controllers/messagesController.js";

const messagesRoute = Router();

messagesRoute.post("/get-messages" , verifyToken , getMessage);

export default messagesRoute;