import React, { createContext, useState } from 'react'

export const LoadingContext = createContext();  // create a context for loading state

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{loading,setLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};
