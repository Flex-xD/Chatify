import { useState, useRef } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";

function MessageBar() {


    const emojiRef = useRef();
    const [message, setMessage] = useState("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);


    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [emojiRef]);

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji)
    }

    const handleSendMessage = async () => {

    }

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
                    <button className="text-neutral-50 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                        onClick={() => setEmojiPickerOpen(true)}
                    >
                        <RiEmojiStickerLine className="text-2xl" />
                    </button>
                    <div className="absolute bottom-16 right-0" ref={emojiRef}>
                        <EmojiPicker
                            theme="dark"
                            open={emojiPickerOpen}
                            onEmojiClick={handleAddEmoji}
                            autoFocusSearch={false}
                        />
                    </div>
                </div>
            </div>
            <button className="bg-[#8417ff] rounded-md flex items-center justify-center hover:bg-[#741bda89] p-5 focus:border-none focus:outline-none focus:bg-[#741bda89] focus:text-white duration-300 transition-all"
                onClick={handleSendMessage}
            >
                <IoSend className="text-2xl" />
            </button>
        </div>
    )
}

export default MessageBar
