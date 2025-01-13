import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { HOST } from "../utils/constants.js";
import { useAppStore } from "../store/index.js"

const socketContext = createContext(null);

export const useSocket = () => {
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { selectedChatData, selectedChatType, addMessage } = useAppStore();
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id }
            })
            socket.current.on("on", () => {
                console.log("Connected to the socket server")
            });

            const handleRecieveMessage = (message) => {
                if (selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)) {
                    addMessage(message);
                }
            };

            socket.current.on("recieveMessage", handleRecieveMessage);
            return () => {
                socket.current.disconnect();
            }
        }
    }, [userInfo])

    return (
        <socketContext.Provider value={socket.current}>
            {
                children
            }
        </socketContext.Provider>
    )
}