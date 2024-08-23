import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TOKEN } from "./constants";
import { CircularProgress } from "@mui/material";
import api from "../Api";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    // checking where use is authenticated or not
    const auth = async () => {
        const token = localStorage.getItem(TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        try {
            setIsAuthorized(true);
            const response = await fetchProfileData();
            setProfileData(response);
        } catch (error) {
            console.log(error)
        }
    };

    // fetch authenticated user profile data
    const fetchProfileData = async () => {
        const response = await api.get('api/profile/')
        if (response.status === 200) {
            return response.data
        }
    }

    if (isAuthorized === null) {
        return <div className="flex justify-center mt-10"><CircularProgress /></div>; // Or any other loading indicator
    }

    return isAuthorized ? React.cloneElement(children, { User: profileData }) : <Navigate to="/login" />;  // if isAuthorized then go to the children page else to login 
}

export default ProtectedRoute;