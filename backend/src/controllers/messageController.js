import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../config/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filterdUsers = await User.findById({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json({ filterdUsers });
    } catch (error) {
        console.log("Errors in getUSersForSidebar :", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user.id;

        const messages = await Message.findBydId({
            $or: [
                { senderID: myId, receiverId: userToChatId },
                { senderID: userToChatId, receiverId: myId }
            ]
        });

        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in the getMessageController :", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user.id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId ,
            recieverId , 
            text , 
            image : imageUrl
        })

        await newMessage.save();
        
    } catch (error) {
        console.log(`Error in the sendMessageController : ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}