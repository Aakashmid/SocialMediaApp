import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children, value }) => {
    const [posts, setPosts] = useState([]);
    return (
        <PostContext.Provider value={value || { posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};
