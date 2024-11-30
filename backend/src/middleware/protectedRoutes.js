import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const token  = req.cookies.jwt;
        if (!token) {
            console.log("Unauthorized - Token not found")
            return res.status(401).
                json({ message: "Unauthorized - Token not found" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            console.log("Unauthorized - Token not matched")
            return res.status(401).json({ message: "Unauthorized - token mismatched" })
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoute Middleware ", error);
        return res.status(500).json({ message: `Error in protectedRoute Middleware ${error}` });
    }
} 