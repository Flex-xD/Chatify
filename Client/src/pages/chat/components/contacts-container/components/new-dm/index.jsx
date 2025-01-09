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
import { ScrollArea } from "@/components/ui/scroll-area"
import Lottie from "react-lottie";
import { animationDefaultOptions } from "../../../../../../lib/utils";
import { apiClient } from "../../../../../../lib/axios.js"
import { SEARCH_CONTACTS_ROUTES } from "../../../../../../utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { getColor } from "../../../../../../lib/utils.js"
import { HOST } from "../../../../../../utils/constants.js"
import { useAppStore } from "../../../../../../store/index.js";

function NewDM() {

    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    const [openContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);

    const selectNewContact = (contact) => {
        setOpenNewContactModal(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchedContacts([]);
    }

    const searchContacts = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, { searchTerm }, { withCredentials: true });
                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts);
                }
            } else {
                setSearchedContacts([]);
            };
        } catch (error) {
            console.log({ error });
        }
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
                <DialogContent className="bg-[#1c1d25] border-none text-white w-[400px] h-[400px] flex flex-col gap-5 items-center">
                    <DialogHeader>
                        <DialogTitle>
                            Please select a contact
                        </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeholder="Search Contacts" className="rounded-lg border-none p-6 bg-[#2c2e3b] w-[22rem]" onChange={e => searchContacts(e.target.value)} />
                    </div>
                    {
                        searchedContacts.length > 0 && (<ScrollArea className="h-[250px]">
                            <div className="flex flex-col gap-5">
                                {
                                    searchedContacts.map((contact) => (<div key={contact._id} className="flex items-center gap-3 cursor-pointer"
                                        onClick={() => selectNewContact(contact)}
                                    >
                                        <div className="h-12 w-12 relative ">
                                            <Avatar className="h-12 w-12 rounded-full">
                                                {
                                                    contact.image ? <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className="object-cover h-full w-full bg-black rounded-full"/> : <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>

                                                        {
                                                            contact?.firstName ? contact.firstName.split("").shift() :
                                                                contact?.email.split("").shift()
                                                        }
                                                    </div>
                                                }
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">

                                            <span>
                                                {contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : ""
                                                }
                                            </span>
                                            <span className="text-xs">
                                                {contact.email}
                                            </span>
                                        </div>
                                    </div>))
                                }
                            </div>
                        </ScrollArea>)
                    }

                    {
                        searchedContacts.length <= 0 && (<div className="flex-1 bg-[#1c1d25] md:flex mt-5 md:mt-0 flex-col justify-center items-center hidden duration-1000 transition-all">
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
