import { Server as socketIOServer } from "socket.io"
import Message from "./models/Message.js";

const setupSocket = (server) => {
    const io = new socketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client Disconnected : ${socket.id}`)
        for (const [userId , socketId] of userSocketMap.entries()) {
            if(socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    const sendMessage  = async (message) => {
        console.log("msg recievd" , message)
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message)

        const MessageData = await Message.findById(message._id)
        .populate("sender" , "id email firstName lastName color")
        .populate("recipient" , "id email firstName lastName color")

        if(recipientSocketId) {
            io.to(recipientSocketId).emit(MessageData);
        }
        if(senderSocketId) {
            io.to(senderSocketId).emit(MessageData);
        }
    }
    
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        } else {
            console.log("User ID is not provided during the connection .")
        }

        socket.on("sendMessage" , sendMessage);
        socket.on("disconnect", () => disconnect(socket));
    })

}

export default setupSocket;