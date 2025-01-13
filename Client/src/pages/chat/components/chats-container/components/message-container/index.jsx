import { useEffect, useRef } from "react";
import { useAppStore } from "../../../../../../store/index";
import moment from "moment";

function MessageContainer() {

    const scrollRef = useRef();
    const { selectedChatData, selectedChatType, userInfo, selectedChatMessages } = useAppStore();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" })
        }
    }, [selectedChatMessages]);

    const renderMessage = () => {
        let lastDate = null;
        return selectedChatMessages.map((message, messageIndex) => {
            const messageDate = moment(message.timeStamp).format("YYYY-MM-DD")
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;
            return (
                <div key={messageIndex}>
                    {showDate && <div className="text-center text-gray-500 my-2">
                        {moment(message.timeStamp).format(
                            "LL"
                        )}
                    </div>}
                    {
                        selectedChatType === "contact" &&
                        renderDMMessages(message)
                    }
                </div>
            )
        })
    }

    const renderDMMessages = (message) => (
        <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
            {
                message.messageType === "text" && (
                    <div className={`${message.sender !== selectedChatData._id ?
                        "bg-[#8417ff]/5  text-[#8417ff]/90 border-[#8417ff]/50" :
                        "bg-[#2a2b33]/5  text-white/80 border-white/20"} border inline-block p-4 rounded my-4 max-w-[50%]`}>
                        {
                            message.content
                        }
                    </div>
                )
            }
            <div className="text-xs text-gray-500">
                {moment(message.timeStamp).format("LT")}
            </div>
        </div>
    )

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[60vw] lg:w-[70vw] xl:w-[80vw] sm:w-full">
            {renderMessage()}
            <div ref={scrollRef} />
        </div>
    )
}

export default MessageContainer;
