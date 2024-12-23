import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { useAppStore } from "../../store/index.js";
import { apiClient } from "../../lib/axios.js";
import Background from "../../assets/login2.png";
import Vicotry from "../../assets/victory.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { toast } from "sonner";
import { LOGIN_ROUTES, SIGNUP_ROUTES } from "../../utils/constants.js";

const Auth = () => {

    const navigate = useNavigate();
    const {setUserInfo} = useAppStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");

    const validateLogin = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.length) {
            toast.error("Email is required")
            return false;
        } else if (!emailPattern.test(email)) {
            toast.error("Follow the correct email pattern !")
            return false;
        } else if (!password.length) {
            toast.error("Password is required !")
            return false;
        }
        return true;
    }

    const validateSignup = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.length) {
            toast.error("Email is required")
            return false;
        } else if (!emailPattern.test(email)) {
            toast.error("Follow the correct email pattern !")
            return false;
        } else if (!password.length) {
            toast.error("Password is required !")
            return false;
        } else if (!confirmPassword.length) {
            toast.error("confirmPassword is required !")
            return false;
        } else if (password !== confirmPassword) {
            toast.error("confirmPassoword should match Password !")
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        if (validateLogin()) {
            try {
                const response = await apiClient.post(LOGIN_ROUTES, { email, password }, { withCredentials: true });
                setUserInfo(response.data.user)
                console.log({ response });
                if (response.data.user) {
                    if (response.data.user.profile) {
                        navigate("/chat")
                    } else {
                        navigate("/profile")
                    }
                }
                toast.success("User Successfully logged-In !");
            } catch (error) {
                console.log(error)
                if (error.response || error.response.data.message) {
                    toast.error(error.response.data.message);
                }
            }
        }
    }

    const handleSignup = async () => {
        if (validateSignup()) {
            try {
                const response = await apiClient.post(SIGNUP_ROUTES, { email, password }, { withCredentials: true });
                setUserInfo(response.data.user)
                console.log({ response });
                if (response.data.user) {
                    navigate("/profile")
                }
                toast.success("User Successfully Registered !");
            } catch (error) {
                if (error.response || error.response.message.data) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong !")
                }
            }
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-slate-100">
            <div className="h-[80vh] bg-white border-2 border-white w-[80vw] text-opacity-95 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-2xl grid xl:grid-cols-2">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-5xl">Welcome</h1>
                            <img src={Vicotry} alt="Victory Emoji" className="h-[100px]" />
                        </div>
                        <p className="font-medium text-center underline">
                            Fill in the details to get started with <span className="font-semibold text-[1.1rem] text-purple-500">Chatify</span> !
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs className="w-3/4" defaultValue="login">
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Signup</TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-5 mt-2" value="login">
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    className="rounded-full p-4 mt-5"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    className="rounded-full p-4"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>

                            </TabsContent>
                            <TabsContent className="flex flex-col gap-5" value="signup">
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    className="rounded-full p-4 mt-5"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    className="rounded-full p-4"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    placeholder="Confirm Password"
                                    type="password"
                                    className="rounded-full p-4"
                                    value={confirmPassword}
                                    onChange={(e) => SetConfirmPassword(e.target.value)}
                                />
                                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden xl:flex justify-center items-center">
                    <img src={Background} alt="Login logo" className="h-[500px]" />
                </div>
            </div>
        </div>
    )
}


export default Auth;
