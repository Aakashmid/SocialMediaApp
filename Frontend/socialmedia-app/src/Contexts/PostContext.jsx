
import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children, value }) => {

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};
