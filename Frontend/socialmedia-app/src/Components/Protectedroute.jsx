import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TOKEN } from "./constants";
import { CircularProgress } from "@mui/material";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, []);

    const auth = async () => {
        const token = localStorage.getItem(TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        setIsAuthorized(true);
    };

    if (isAuthorized === null) {
        return <div className="flex justify-center mt-10"><CircularProgress /></div>; // Or any other loading indicator
    }

    return isAuthorized ? children : <Navigate to="/login" />;  // if isAuthorized then go to the children page else to login 
}

export default ProtectedRoute;