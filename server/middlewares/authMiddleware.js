import jwt from "jsonwebtoken";

export const verifyToken = (req , res , next) =>  {
    const token = req.cookies.jwt;
    if (!token) return res.status(403).json({message:"You are unAuthorized !"});
    jwt.verify(token , process.env.JWT_SECRET , async (err , payload) => {
        if (err) return res.status(403).json({message : "Token is invalid !"});
        req.userId = payload.userId;
        next()
    })
}