import express, { Router } from "express";
import { protectedRoute } from "../middleware/protectedRoutes.js";
import { getUsersForSidebar , getMessages , sendMessages } from "../controllers/messageController.js";
const router = express.Router();

router.get("/users" , protectedRoute , getUsersForSidebar);
router.get("/:id" , protectedRoute , getMessages);

router.post("/send/:id" , protectedRoute , sendMessages);

export default router;