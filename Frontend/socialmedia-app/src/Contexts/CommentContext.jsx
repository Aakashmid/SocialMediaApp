import React, { createContext, useState } from 'react';

// Create the context
export const CommentsContext = createContext();

// Create a provider component
export const CommentsContextProvider = ({ children, initialCommentsCount }) => {
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

    return (
        <CommentsContext.Provider value={{ comments, setComments, commentsCount, setCommentsCount }}>
            {children}
        </CommentsContext.Provider>
    );
};