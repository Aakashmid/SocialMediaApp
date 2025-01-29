import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { checkServerStatus } from "../services/apiService";
import { TOKEN } from "../Components/constants";

function ProtectedRoute({ serverProps, authorizationProps }) {
    const [isAuthorized, setIsAuthorized] = authorizationProps;
    const [serverStatus, setServerStatus] = serverProps;

    useEffect(() => {
        const checkServerAndAuth = async () => {
            if (isAuthorized) {
                setServerStatus({ isChecking: false, isError: false });
                return;
            }
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

        checkServerAndAuth();

    }, [setIsAuthorized, setServerStatus]);

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
    if (!isAuthorized) {
        return <Navigate to="/auth/login" replace />;
    }

    console.log('protected route');
    return <Outlet />;
}

export default ProtectedRoute;