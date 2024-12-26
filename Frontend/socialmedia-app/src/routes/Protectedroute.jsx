import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TOKEN } from "../Components/constants";
import { CircularProgress } from "@mui/material";

function ProtectedRoute() {
    const [isAuthorized, setIsAuthorized] = useState(null);
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    // checking where user is authenticated or not
    const auth = async () => {
        const token = localStorage.getItem(TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        setIsAuthorized(true)
    };



    if (isAuthorized === null) {
        return <div className="flex justify-center mt-10"><CircularProgress /></div>; // Or any other loading indicator
    }

    return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" />;  // if isAuthorized then go to the children page else to login 
}

export default ProtectedRoute;