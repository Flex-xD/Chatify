import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup" , authController.signupController);

export default router;
