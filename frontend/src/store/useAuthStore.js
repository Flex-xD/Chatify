import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in the CheckAuth : ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup" , data);
            set({authUser:res.data});
            toast.success("Successfully Signed-Up !")
        } catch (error) {
            console.log("Error while signingUp : " , error);
            toast.error(error.response.data.message);
        } finally {
            set({isSigningUp:false});
        }
    } ,

    login : async (data) => {
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login" , data);
            toast.success("Logged-In Successfully !");
            set({authUser : res.data});
        } catch (error) {
            console.log("Error while logging-In : " , error);
            toast.error("Invalid Credentials !");
        } finally {
            set({isLoggingIn:false})
        }
    },

    logout : async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            console.log("Error while logging out : " , error);
            toast.error(error.response.data.message);
        }
    } ,

    updateProfile : async () => {
        set({isUpdatingProfile:true});
        try {
            const res = await axiosInstance.put("/auth/update-profile" , data);
            set({authUser : res.data});
        } catch (error) {
            console.log("Error in the Update-Profile : " , error);
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile:false});
        }
    }

}));