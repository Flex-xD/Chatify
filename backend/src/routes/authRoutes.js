import express from "express";
import { signup , login , logout} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup" , signup)
router.post("/login" , login )
router.post("/Logout" , logout )


export default router;