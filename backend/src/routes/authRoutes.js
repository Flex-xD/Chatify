import express from "express";
import { protectedRoute } from "../middleware/protectedRoutes.js";
import { signup , login , logout , updateProfile , checkAuth} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login );
router.post("/Logout" , logout );

router.put("/update-profile" , protectedRoute , updateProfile);

router.get("/check" , protectedRoute , checkAuth);

export default router;