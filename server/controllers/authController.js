import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {renameSync , unlinkSync} from "fs";

const maxAge = 7 * 24 * 60 * 60 * 1000;
const createToken = async (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: maxAge });
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

        const token = await createToken(user.email, user._id);
        res.cookie("jwt", token, {
            maxAge: maxAge,
            httpOnly: true,
            sameSite: true,
            secure: "None"
        });

        console.log("User successfully registered !");
        return res.status(201).json({
            user: {
                email: user.email,
                password: user.password,
                profileSetup: user.profileSetup,
                id: user._id
            }
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ error: error.message });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required !" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email is not found !" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Incorrect Credentials !" });
        }

        const token = await createToken(user.email, user._id);
        console.log({ token })
        res.cookie("jwt", token, {
            maxAge: maxAge,
            httpOnly: true,
            sameSite: true,
            secure: "None"
        });

        console.log("User successfully logged In !")
        return res.status(200).json({
            user: {
                email: user.email,
                password: user.password,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
                id: user._id
            }
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ message: error });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        if (!userData) return res.status(403).json({ message: "User with the given ID not found." });
        return res.status(200).json({
            email: userData.email,
            password: userData.password,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            id: userData._id
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName) {
        res.status(400).json({ message: "FirstName , LastName and color are required !" });
    }

    const userData = await User.findByIdAndUpdate(userId,
        {
            firstName,
            lastName,
            color,
            profileSetup: true,
        }, {
        new: true, runValidators: true
    }
    )
    return res.status(200).json({
        email: userData.email,
        password: userData.password,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
        id: userData._id
    })
}

export const addProfileImage = async (req , res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message : "Image is required !"})
        }
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path , fileName);

        const updatedUser = await User.findByIdAndUpdate(req.userId , {image:fileName} , {new:true , runValidators:true});

        return res.status(200).json({
            image:updatedUser.image
        })
    } catch (error) {
        console.log({error});
        res.status(500).json({message:"Internal server error !"})
    }
}

export const removeProfileImage = async (req , res) => {
    try {
        const {userId} = req;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({message : "User not found !"})
        };

        if (user.image) {
            unlinkSync(user.image);
        }

        user.image = null;
        await user.save();      
        
        return res.status(200).json({message:"Profile images removed successfully !"})
    } catch (error) {
        console.log({error});
        res.status(400).json({message:"Internal server error !"})
    }
}