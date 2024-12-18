import User from "../models/User.js";
import jwt from "jsonwebtoken";

const maxAge = 7 * 24 * 60 * 60 * 60;
const createToken = async (email , userId) => {
    jwt.sign({email , userId} , process.env.JWT_SECRET , {expiresIn:maxAge});
    res.cookie("jwt" , createToken(email , userId ) , {
        maxAge:maxAge ,
        httpOnly:true,
        sameSite:true ,
        secure:"None"
    });
}

export const signupController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is required !" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists !");
            return res.status(400).json({ message: "User already exists !" })
        }

        const user = new User({
            email,
            password
        });
        createToken(user.email , user._id);

        console.log("User successfully registered !");
        return res.status(201).json({user : {
            email:user.email ,
            password :user.password ,
            profileSetup:user.profileSetup
        }})
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message });
    }
}