import express from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer({dest:"uploads/profiles/"})

router.post("/signup" , authController.signupController);
router.post("/login" ,  authController.loginController);
router.get("/user-info" , verifyToken , authController.getUserInfo);
router.post("/update-profile" , verifyToken , authController.updateProfile);
router.post("/add-profile-image" , verifyToken , upload.single("profile-image"),authController.addProfileImage);
router.delete("/remove-profile-image" , verifyToken , authController.removeProfileImage);
router.post("/logout" , authController.logout);

export default router;
