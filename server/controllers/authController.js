import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyToken } from "../middlewares/authMiddleware.js";

const maxAge = 7 * 24 * 60 * 60 * 60;
const createToken = async (email , userId) => {
    jwt.sign({email , userId} , process.env.JWT_SECRET , {expiresIn:maxAge});
}

export const signupController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required !" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists !");
            return res.status(400).json({ message: "User already exists !" })
        }

        const user = await User.create({
            email,
            password
        });
        res.cookie("jwt" , createToken(user.email , user._id ) , {
            maxAge:maxAge ,
            httpOnly:true,
            sameSite:true ,
            secure:"None"
        });

        console.log("User successfully registered !");
        return res.status(201).json({user : {
            email:user.email ,
            password :user.password ,
            profileSetup:user.profileSetup ,
            id:user._id
        }})
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message });
    }
}

export const loginController = async (req , res) => {
    try {
        const {email , password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message :  "Email and password are required !"});
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message :  "User with this email is not found !"});
        }
        const match = await bcrypt.compare(password , user.password);
        if (!match) {
            return res.status(400).json({message :  "Incorrect Credentials !"});
        }

        res.cookie("jwt" , createToken(user.email , user._id ) , {
            maxAge:maxAge ,
            httpOnly:true,
            sameSite:true ,
            secure:"None"
        });
        
        console.log("User successfully logged In !")
        return res.status(200).json({user : {
            email:user.email ,
            password :user.password ,
            profileSetup:user.profileSetup , 
            firstName:user.firstName , 
            lastName:user.lastName ,
            image:user.image , 
            color:user.color ,
            id:user._id
        }})
    } catch (error) {
        console.log({error});
        return res.status(500).json({message :error});
    }
}

export const getUserInfo = async (req , res) => {
    try {
        verifyToken(req , res , next);
        const userData = await User.findById(req.userId);
        if (!userData) return res.status(403).json({message : "User with the given ID not found."});
        return res.status(200).json({
            email:userData.email ,
            password :userData.password ,
            profileSetup:userData.profileSetup , 
            firstName:userData.firstName , 
            lastName:userData.lastName ,
            image:userData.image , 
            color:userData.color ,
            id:userData._id
        })
    } catch (error) {
        console.log({error});
        return res.status(500).json({message:error.message});
    }
}