import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import UserPage from "./pages/user/UserPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";


function UserApp() {
  return (
    <Routes>
    <Route path="/jnd/" element={<LandingPage />} />
    <Route path="/jnd/register" element={<RegisterPage />} />
    <Route path="/jnd/login" element={<LoginPage />} />
  
    <Route path="/jnd/user" element={<UserPage />} />
</Routes>
  );
}

export default UserApp;
