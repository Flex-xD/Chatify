import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Lottie from "react-lottie";
import { animationDefaultOptions } from "../../../../../../lib/utils";

function NewDM() {

    const [openContactModal, setOpenNewContactModal] = useState(false);

    const [searchedContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {

    }

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
            <Dialog open={openContactModal} onChange={setOpenNewContactModal}>
                <DialogContent className="bg-[#1c1d25] border-none text-white w-[400px] h-[400px] flex flex-col items-center">
                    <DialogHeader>
                        <DialogTitle>
                            Please select a contact
                        </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeHolder="Search Contacts" className="rounded-lg border-none p-6 bg-[#2c2e3b] w-[22rem]" onChange={e => searchContacts(e.target.value)} />
                    </div>
                    {
                        searchedContacts.length <= 0 && (<div className="flex-1 bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
                            <Lottie
                                isClickToPauseDisabled={false}
                                height={100}
                                width={100}
                                options={animationDefaultOptions}
                            />
                            <div className="text-opacity-80 text-white flex flex-col items-center gap-5 mt-10 lg:text-2xl text-xl transition-all duration-300 text-center">
                                <h3 className="poppins-medium underline underline-offset-4 decoration-gray-500 decoration-1">
                                    Search new
                                    <span className="text-purple-500 font-bold "> Contacts </span>
                                        !
                                </h3>
                            </div>
                        </div>)
                    }
                </DialogContent>
            </Dialog>

        </>
    )
}

export default NewDM;
