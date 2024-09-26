import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import axios from "axios";
import { AuthProvider, useAuth } from "./contexts/authentication.jsx";

import AdminApp from "./AdminApp";
import UserApp from "./UserApp";
import GuestApp from "./GuestApp";

import jwtInterceptor from "./utils/jwtInterceptor.js";

const AppRoutes = () => {
    const { state, checkToken } = useAuth();

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    useEffect(() => {
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
        if (csrfToken) {
            axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        }
    }, []);

   
    if (state.isAuthenticated === null) {
        return <div>Loading...</div>; 
    }

    return (
        <Routes>
            {state.user && state.user.role === "admin" ? (
                <Route path="/*" element={<AdminApp />} />
            ) : state.user && state.user.role === "user" ? (
                <Route path="/*" element={<UserApp />} />
            ) : (
                <Route path="/*" element={<GuestApp />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const App = () => {
    jwtInterceptor(); 

    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
