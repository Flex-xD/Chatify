import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";


function NewDM() {

    const [openContactModal , setOpenNewContactModal] = useState(false);

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className="text-opacity-90 font-light text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all duration-300 text-start
                        ml-2
                        "
                        onClick={() => setOpenNewContactModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent
                    className="bg-[#1c1b1e] border-none mb-2 p-3 text-white"
                    >
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </>
    )
}

export default NewDM;
