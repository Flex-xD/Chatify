import { useEffect } from "react";
import { useAppStore } from "../../store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const navigate = useNavigate();
    const {userInfo} = useAppStore();
    useEffect(() => {
        if(!userInfo.profileSetup) {
            toast("Set up your profile to continue");
            navigate("/profile")
        }
    } , [userInfo , navigate ])

    return <div>

    </div>
}

export default Chat;
