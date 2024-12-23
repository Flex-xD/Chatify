import express from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup" , authController.signupController);
router.post("/login" ,  authController.loginController);
router.get("/user-info" , verifyToken , authController.getUserInfo);


export default router;
