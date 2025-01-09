import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { getColor } from "../../../../../../lib/utils.js"


import { useAppStore } from "../../../../../../store";
import { HOST } from "../../../../../../utils/constants";
function ChatHeader() {
    const { closeChat, selectedChatData , selectedChatType} = useAppStore();
    console.log(selectedChatData);
    return (
        <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
            <div className="flex items-center gap-5 w-full justify-between">
                <div className="flex items-center justify-center gap-3">

                    <div className="h-12 w-12 relative ">
                        <Avatar className="h-12 w-12 rounded-full">
                            {
                                selectedChatData.image ? <AvatarImage src={`${HOST}/${selectedChatData.image}`} alt="profile" className="object-cover h-full w-full bg-black rounded-full" /> : <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(selectedChatData.color)}`}>

                                    {
                                        selectedChatData?.firstName ? selectedChatData.firstName.split("").shift() :
                                            selectedChatData?.email.split("").shift()
                                    }
                                </div>
                            }
                        </Avatar>
                    </div>
                    <div>
                        {
                            selectedChatType === "contact" && selectedChatData.firstName ? `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email
                        }
                    </div>
                </div>

                <div className="fle items-center justify-center gap-5">
                    <button className="text-neutral-50 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                        <RiCloseFill className="text-3xl"
                            onClick={closeChat}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
