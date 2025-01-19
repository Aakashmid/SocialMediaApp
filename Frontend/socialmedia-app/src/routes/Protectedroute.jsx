import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { checkServerStatus } from "../services/apiService";
import { TOKEN } from "../Components/constants";



function ProtectedRoute() {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [serverStatus, setServerStatus] = useState({
        isChecking: true,
        isError: false,
    });

    const checkServerAndAuth = async () => {
        try {
            // First check if server is running
            await checkServerStatus();
            // If server check passes, proceed with auth check
            const token = localStorage.getItem(TOKEN);
            setIsAuthorized(!!token);
        } catch (error) {
            console.error("Server connection error:", error);
            setServerStatus({
                isChecking: false,
                isError: true
            });
        } finally {
            setServerStatus(prev => ({
                ...prev,
                isChecking: false
            }));
        }
    };

    useEffect(() => {
        checkServerAndAuth();
    }, []);

    // Show loading state while checking server and auth
    if (serverStatus.isChecking) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    // Show server error if server is not responding
    if (serverStatus.isError) {
        return <Navigate to="/server-error" replace />;
    }

    // Handle authentication routing
    return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default ProtectedRoute;