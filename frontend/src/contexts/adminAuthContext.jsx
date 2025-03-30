import { createContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from "react-router-dom";
import { JWT_TOKEN } from "../constants";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = () => {
    const token = localStorage.getItem(JWT_TOKEN);
    let initialAdmin = null;
    let decodedToken = null;
    if (token) {
        decodedToken = jwtDecode(token);
        if (decodedToken.username) {
            initialAdmin = {
                id: decodedToken.id,
                username: decodedToken.username
            }
        }
    }
    const [admin, setAdmin] = useState(initialAdmin);

    if (!token) {
        return <Navigate to="/" />
    }
    if (token && !decodedToken.username) {
        localStorage.removeItem(JWT_TOKEN);
        return <Navigate to="/" replace />
    }


    const logout = () => {
        // Remove token from local storage
        localStorage.removeItem(JWT_TOKEN);
        setAdmin(null);
    }

    return (
        <AdminAuthContext.Provider value={{ admin, logout }}>
            <Outlet />
        </AdminAuthContext.Provider>
    )
}