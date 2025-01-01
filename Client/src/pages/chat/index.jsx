import { useEffect } from "react";
import { useAppStore } from "../../store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chats-container";

const Chat = () => {
    const navigate = useNavigate();
    const {userInfo} = useAppStore();
    useEffect(() => {
        if(!userInfo.profileSetup) {
            toast("Set up your profile to continue");
            navigate("/profile")
        }
    } , [userInfo , navigate ])

    return <div className="flex h-[100vh] text-white overflow-hidden">
        <ContactsContainer/>
        <EmptyChatContainer/>
        <ChatContainer/>
    </div>
}

export default Chat;
