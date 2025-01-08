import {RiCloseFill} from "react-icons/ri";
import { useAppStore } from "../../../../../../store";
function ChatHeader() {
    const {closeChat} = useAppStore();
    return (
        <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
            <div className="flex items-center gap-5">
                <div className="fle items-center justify-center gap-3">
                    
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
