import express from "express";
import * as contactsController from "../controllers/contactsController.js";
import {verifyToken} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/search" , verifyToken , contactsController.searchContact);

export default router;