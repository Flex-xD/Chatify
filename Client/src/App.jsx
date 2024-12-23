import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store/index.js";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/axios.js";
import { GET_USER_INFO } from "./utils/constants.js";

const App = () => {
  const PrivateRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticted = !!userInfo;
    return isAuthenticted ? children : <Navigate to={"/auth"} />;
  }

  const AuthRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticted = !!userInfo;
    return isAuthenticted ? <Navigate to={"/chat"} /> : children;
  }

  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useAppStore();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO,
            { withCredentials: true });
            console.log({response});
            if (response.status===200 && response.data.id) {
              setUserInfo(response.data);
            } else {
              setUserInfo(undefined);
            }
      } catch (error) {
        console.log({ error });
        setUserInfo(undefined)
      } finally {
        setLoading(false);
      }
    }
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(true);
    }
  } , [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute>
          <Auth />
        </AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute>
          <Profile />
        </PrivateRoute>} />

        <Route path="*" element={<Navigate to={"/auth"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
