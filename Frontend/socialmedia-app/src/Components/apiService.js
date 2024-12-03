import api from "../Api"
import {  useNavigate } from "react-router-dom";
export const useFetchUserProfile = () => {
    const navigate = useNavigate();
    const fetchUserProfile = async (id) => {
        try {
            const response = await api.get(`/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            if (error.response && error.response.status === 401) { // Correct error status check
                navigate('/login');
            }
            throw error;
        }
    };
    return fetchUserProfile;
};


/////////////////////////////////////////////////////////// post related

// like a post 
export const LikePost = async (userId) => {
    try {
        const res = await api.post(`/api/posts/${userId}/like/`);
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        throw error
    }
}

// get posts
export const GetPostDetail = async (id) => {
    try {
        const response = await api.get(`/api/posts/${id}`);
        if (response.status != 200) {
            throw new Error('Failed to fetch post detail');
        }
        return await response.data;
    } catch (error) {
        throw error;
    }
}


// update a post
export const UpdatePost = async (id, post_data) => {
    try {
        const response = await api.put(`/api/posts/${id}`, post_data);
        if (response.status != 200) {
            throw new Error('Failed to update post');
        }
        return await response.data;
    } catch (error) {
        throw error;
    }
}


// create post
export const CreatePost = async (id, post_data) => {
    try {
        const response = await api.post(`/api/posts/`, post_data);
        if (response.status != 201) {
            throw new Error('Failed to create post');
        }
        return await response.data;
    } catch (error) {
        throw error;
    }
}


///// Comment Related 
export const fetchComments = async (post_id) => {  // fetch comments of post of post_id
    try {
        const response = await api.get(`/api/posts/${post_id}/comments`);
        return await response.data;
    } catch (error) {
        throw error;
    }
}

export const createComment = async (post_id, comment_data) => {
    try {
        const response = await api.post(`/api/posts/${post_id}/comments/`, comment_data);
        return await response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteComment = async (comment_id) => {
    
}

//////////// follower related /////////////////

// follow a user
export const followUser = async (userId) => {
    try {
        const res = await api.post(`/api/users/${userId}/follow/`)
        // if (res.status === 200){
        return res.data
        // }
    } catch (error) {
        console.error(error)
    }
}

export const unfollowUser = async (userId) => {
    try {
        const res = await api.delete(`/api/users/${userId}/unfollow/`)
        return res.data
    } catch (error) {
        throw error
    }
}


// get folllowings of a user 
export const fetchUserFollowings = async (userId) => {
    try {
        const response = await api.get(`/api/users/${userId}/followings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user followings:', error);
        throw error;
    }
};

export const fetchUserFollowers = async (userId) => {
    try {
        const response = await api.get(`/api/users/${userId}/followers`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch user followers');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching user followers:', error);
        throw error;
    }
};

