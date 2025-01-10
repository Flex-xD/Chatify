import { Server as socketIOServer } from "socket.io"

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
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        } else {
            console.log("User ID is not provided during the connection .")
        }

        socket.on("disconnect", () => disconnect(socket));
    })

}

export default setupSocket;