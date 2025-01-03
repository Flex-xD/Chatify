import { useState } from "react"
import { GrAttachment } from "react-icons/gr"
import { RiEmojiStickerLine } from "react-icons/ri";
import {IoSend} from "react-icons/io5"

function MessageBar() {

    const [message, setMessage] = useState("");

    return (
        <div className='h-[10vw] bg-[#1c1d25] flex justify-center items-center gap-6 px-8 mb-6 '>
            <div className="flex flex-1 bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
                <input type='text' className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none ' placeholder='Enter Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="text-neutral-50 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <GrAttachment className="text-2xl" />
                </button>
                <div className="relative">
                    <button className="text-neutral-50 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                        <RiEmojiStickerLine className="text-2xl" />
                    </button>
                    <div className="absolute bottom-16 right-0">
                    </div>
                </div>
            </div>
            <button className="bg-[#8417ff] rounded-md flex items-center justify-center hover:bg-[#741bda89] p-5 focus:border-none focus:outline-none focus:bg-[#741bda89] focus:text-white duration-300 transition-all">
                <IoSend className="text-2xl" />
            </button>
        </div>
    )
}

export default MessageBar
