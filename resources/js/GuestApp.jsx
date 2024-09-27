import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import UserPage from "./pages/user/UserPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";

function GuestApp() {
    return (
        <Routes>
            <Route path="/home" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default GuestApp;
