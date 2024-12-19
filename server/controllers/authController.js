import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge = 7 * 24 * 60 * 60 * 60;
const createToken = async (email , userId , res) => {
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
            profileSetup:user.profileSetup
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
            color:user.color
        }})
    } catch (error) {
        console.log({error});
        return res.status(500).json({message :error});
    }
}