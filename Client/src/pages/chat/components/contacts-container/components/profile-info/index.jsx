import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useAppStore } from "../../../../../../store"
import { HOST, LOGOUT_ROUTE } from "../../../../../../utils/constants";
import { getColor } from "../../../../../../lib/utils.js"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../../components/ui/tooltip.jsx"
import { FaUserEdit } from "react-icons/fa";
import {apiClient} from "../../../../../../lib/axios.js"
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
    const { userInfo , setUserInfo} = useAppStore();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE , {} , {withCredentials:true});
            if (response.status === 200) {
                navigate("/login");
                setUserInfo(null);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
            <div className="h-12 w-12 relative ">
                <Avatar className="h-12 w-12 rounded-full">
                    {
                        userInfo.image ? <AvatarImage src={`${HOST}/${userInfo.image}`} alt="profile" className="object-cover h-full w-full bg-black" /> : <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>

                            {
                                userInfo?.firstName ? userInfo.firstName.split("").shift() :
                                    userInfo?.email.split("").shift()
                            }
                        </div>
                    }
                </Avatar>
            </div>
            <div>
                {
                    userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                }
            </div>
            <div className="flex gap-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FaUserEdit className="font-medium text-purple-500 text-2xl"
                                onClick={() => navigate("/profile")}
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                            Edit Profile
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoPowerSharp className="font-medium text-purple-500 text-2xl"
                                onClick={logout}
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                            Logout
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default ProfileInfo
