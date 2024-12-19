import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup" , authController.signupController);
router.post("/login" , authController.loginController);

export default router;
