import { generateToken } from "../config/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required." })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password length must be 6 letters or greater." })
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            console.log("User successfully Regiistered")
            return res.status(201).json({
                message: "User Successfully Registered",
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        } else {
            console.log("Wrong credentials")
            return res.status(400).json({ message: "Wrong Credentials" });
        }
    } catch (error) {
        console.log("Error in signUp controller : ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Wrong Credentials ." })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong credentials ." })
        }

        generateToken(user._id, res);
        res.status(200).json({
            message: "User successfully loggedIn.",
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic
        })
        console.log("User successfully loggedIn.")
    } catch (error) {
        console.log("Error during logIn Controller: ", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true , secure : false}); 
        console.log("User logged out successfully .")
        return res.status(200).json({ message: "User logged out successfully ." })
    } catch (error) {
        console.log("Internal Server error .");
        return res.status(500).json({ message: "Internal Server error ." })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            console.log("Profile picture is required");
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: (await uploadResponse).secure_url }, { new: true })

        res.status(200).json({ updatedUser });
    } catch (error) {
        console.log(`Internal Server Error : ${error}`);
        return res.status(500).json({ message: `Internal Server Error : ${error}` })
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(`Error in CheckAuth : ${error.message}`)
        res.status(500).json({ message: "Internal Server error" });
    }
}
