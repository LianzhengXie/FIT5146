import { createContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { JWT_TOKEN } from "../constants";
import { isTokenExpired } from "../util";
import { useQueryClient } from "react-query";

export const PatientAuthContext = createContext();

export const PatientAuthProvider = () => {
    const token = localStorage.getItem(JWT_TOKEN);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    let initialPatient = null;
    let decodedToken = null;
    if (token) {
        decodedToken = jwtDecode(token);
        if (decodedToken.username) {
            initialPatient = {
                id: decodedToken.id,
                patient: decodedToken.patient,
                visit_dt_tm: decodedToken.visit_dt_tm
            }
        }
    }
    const [patient, setPatient] = useState(initialPatient);

    if (!token) {
        return <Navigate to="/" />
    }
    if ((token && !decodedToken.patient) || isTokenExpired(token)) {
        localStorage.removeItem(JWT_TOKEN);
        return <Navigate to="/" replace />
    }


    const logout = () => {
        // Remove token from local storage
        localStorage.removeItem(JWT_TOKEN);
        setPatient(null);
        // Remove all queries
        queryClient.removeQueries();
        // Redirect to '/'
        navigate("/", { replace: true });
    }

    return (
        <PatientAuthContext.Provider value={{ patient, logout }}>
            <Outlet />
        </PatientAuthContext.Provider>
    )
}