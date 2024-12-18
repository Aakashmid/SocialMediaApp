import api from "../Api"
import { useNavigate } from "react-router-dom";


////////////////////////////////// User related endpoints ///////////////////////////////
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


export const partialUpdateUserProfile = async (user_id,data) => {
    try {
        const response = await api.patch(`/api/users/${user_id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

// export const updateUserProfile = async (user_id, data) => {
//     try {
//         const response = await api.put(`/api/users/${user_id}/`, data);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         throw error;
//     }
// }

// delete user account



/////////////////////// Post related ///////////////////////

// get posts
export const fetchPosts = async (post_id) => {
    try {
        const response = await api.get(`/api/posts/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get post detail
export const GetPostDetail = async (post_id) => {
    try {
        const response = await api.get(`/api/posts/${post_id}`);
        return await response.data;
    } catch (error) {
        throw error;
    }
}


// like a post 
export const LikePost = async (post_id) => {
    try {
        const res = await api.post(`/api/posts/${post_id}/toggle-like/`);
        return res.data;
    } catch (error) {
        throw error;
    }
}


// update a post
export const UpdatePost = async (id, post_data) => {
    try {
        const response = await api.put(`/api/posts/${id}`, post_data);
        return await response.data;
    } catch (error) {
        throw error;
    }
}


// create post
export const CreatePost = async ( post_data) => {
    try {
        const response = await api.post(`/api/posts/`, post_data);
        return response.data;
    } catch (error) {
        throw error;
    }
}


///////////////////////////////// Comment Related  /////////////////////////////////
export const fetchComments = async (post_id) => {  // fetch comments of a post of post_id
    try {
        const response = await api.get(`/api/comments/posts/${post_id}/`);
        return await response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchReplies = async (comment_id) => {  // fetch replies of a comment
    try {
        const response = await api.get(`/api/comments/${comment_id}/replies`);
        return await response.data;
    } catch (error) {
        throw error;
    }
}


export const createComment = async (post_id, comment_data) => {
    try {
        const response = await api.post(`/api/comments/posts/${post_id}/`, comment_data);
        return await response.data;
    } catch (error) {
        throw error;
    }
}

//  handle like to comment or reply 
export const likeCommentReply = async (comment_id) => {
    try {
        const res = await api.post(`/api/comments/${comment_id}/like/`);
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const createReply = async (comment_id, reply_data) => {
    try {
        const response = await api.post(`/api/comments/${comment_id}/replies/`, reply_data);
        return await response.data;
    } catch (error) {
        throw error;
    }
}


// function to delete a comment or reply ( reply is taking as a comment object whose parent is a comment )
export const deleteComment = async (comment_id) => {
    try {
        const response = await api.delete(`/api/comments/${comment_id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}



//////////////////////// follower related //////////////////////////

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

