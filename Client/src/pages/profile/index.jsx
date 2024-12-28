import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store";
import { Navigate, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"
import { Avatar, AvatarImage } from "../../components/ui/avatar.jsx"
import { getColor, colors } from "../../lib/utils.js"
import { FaTrash, FaPlus } from "react-icons/fa"
import { Input } from "../../components/ui/input.jsx"
import { Button } from "../../components/ui/button.jsx"
import { toast } from "sonner";
import { apiClient } from "../../lib/axios.js"
import { UPDATE_PROFILE_ROUTE } from "../../utils/constants.js";

const Profile = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppStore();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (userInfo.profileSetup) {
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setSelectedColor(userInfo.color);
        }
    } , [userInfo])

    const validateProfile = () => {
        if (!firstName) {
            toast.error("FirstName is required !");
            return false;
        }
        if (!lastName) {
            toast.error("LastName is required !")
            return false;
        }
        return true;
    }

    const saveChanges = async () => {
        if (validateProfile()) {
            try {
                const response = await apiClient.post(UPDATE_PROFILE_ROUTE,
                    {
                        firstName, 
                        lastName,
                        color: selectedColor
                    } , {withCredentials:true});
                if(response.status === "200" && response.data) {
                    setUserInfo(...response.data);
                    toast.success("Profile Setuped ! ")
                    navigate("/chat");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleNavigate = () => {
        if(userInfo.profileSetup) {
            Navigate("/chat");
        } else {
            toast.error("Please setup profile first !")
        }
    }

    return (
        <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
            <div className="flex flex-col gap-10 w-[80vw] md:w-max">
                <div onClick={handleNavigate}>
                    <IoArrowBack className="text-4xl lg:6xl text-white/90 cursor-pointer" />
                </div>
                <div className="grid grid-cols-2">
                    <div className="h-full w-32  md:w-48 md:h-48 relative flex items-center justify-center"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                            {
                                image ? <AvatarImage src={image} alt="profile" className="object-cover h-full w-full bg-black" /> : <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                                    {
                                        firstName ? firstName.split("").shift() :
                                            userInfo.email.split("").shift()
                                    }
                                </div>
                            }
                        </Avatar>
                        {
                            hovered && <div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer rounded-full">
                                {
                                    image ? <FaTrash className="cursor-pointer text-3xl text-white" /> : <FaPlus className="cursor-pointer text-3xl text-white" />
                                }
                            </div>
                        }
                        {/* <input type="text" /> */}
                    </div>
                    <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
                        <div className="w-full">
                            <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-large p-6 bg-[#2c2e3b] border-none" />
                        </div>
                        <div className="w-full">
                            <Input placeholder="First Name" type="email" value={firstName} onChange={e => setFirstName(e.target.value)} className="rounded-large p-6 bg-[#2c2e3b] border-none" />
                        </div>
                        <div className="w-full">
                            <Input placeholder="Last Name" type="email" value={lastName} onChange={e => setLastName(e.target.value)} className="rounded-large p-6 bg-[#2c2e3b] border-none" />
                        </div>
                        <div className="w-full flex gap-5">
                            {
                                colors.map((color, colorIndex) => <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === colorIndex ? "outline outline-white/20 outline-1" : ""}}`} key={colorIndex} onClick={() => setSelectedColor(colorIndex)}></div>)
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Profile;
