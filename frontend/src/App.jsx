import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import LoginPage from "./components/loginPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";

const app = () => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  } , [checkAuth])

  console.log({authUser});
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
};

export default app;
