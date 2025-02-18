import { useContext } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ProfileDataContext } from "../Contexts/ProfileContext";



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
                navigate('/auth/login');
            }
            if (error.response && error.response.status === 500) {
                navigate('/server-error');
            }
            throw error;
        }
    };
    return fetchUserProfile;
};


export const partialUpdateUserProfile = async (user_id, data) => {
    try {
        const response = await api.patch(`/api/users/${user_id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
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


export const fetchSearchUsers = async (searchQuery) => {
    try {
        const response = await api.get(`/api/users/?search=${searchQuery}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}

export const fetchUserPosts = async (user_id, searchQuery) => {
    try {
        if (searchQuery) {
            const response = await api.get(`/api/posts/profile-posts/${user_id}?search=${searchQuery}`);
            return response.data;
        } else {
            const response = await api.get(`/api/posts/profile-posts/${user_id}`);
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}



export const fetchFriends = async () => {
    try {
        const response = await api.get(`/api/users/friends`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


export const fetchMutualFriends = async (user_id) => {
    try {
        const response = await api.get(`/api/users/${user_id}/mutual-friends`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


export const checkServerStatus = async () => {
    try {
        const response = await api.get('/api/check-server-status/');
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}

/////////////////////// Post related ///////////////////////

// get posts
export const fetchPosts = async () => {
    try {
        const response = await api.get(`/api/posts/`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


export const fetchSearchPosts = async (searchQuery) => {
    try {
        const response = await api.get(`/api/posts/?search=${searchQuery}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


// get post detail
export const GetPostDetail = async (post_id) => {
    try {
        const response = await api.get(`/api/posts/${post_id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


// like a post 
export const LikePost = async (post_id) => {
    try {
        const res = await api.post(`/api/posts/${post_id}/toggle-like/`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


// update a post
export const UpdatePost = async (id, post_data) => {
    try {
        const response = await api.patch(`/api/posts/${id}/`, post_data);
        return await response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


// create post
export const CreatePost = async (post_data) => {
    try {
        const response = await api.post(`/api/posts/`, post_data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


// delete post 
export const DeletePost = async (post_id) => {
    try {
        const response = await api.delete(`/api/posts/${post_id}/`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}




// save a post
export const SavePost = async (post_id) => {
    try {
        const response = await api.post(`/api/posts/${post_id}/toggle-save/`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


// get saved post 
export const fetchSavedPosts = async () => {
    try {
        const response = await api.get('/api/posts/saved-posts/');
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}




///////////////////////////////// Comment Related  /////////////////////////////////
export const fetchComments = async (post_id) => {  // fetch comments of a post of post_id
    try {
        const response = await api.get(`/api/comments/posts/${post_id}/`);
        return await response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}

export const fetchReplies = async (comment_id) => {  // fetch replies of a comment
    try {
        const response = await api.get(`/api/comments/${comment_id}/replies`);
        return await response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


export const createComment = async (post_id, comment_data) => {
    try {
        const response = await api.post(`/api/comments/posts/${post_id}/`, comment_data);
        return await response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}

//  handle like to comment or reply 
export const likeCommentReply = async (comment_id) => {
    try {
        const res = await api.post(`/api/comments/${comment_id}/like/`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


export const createReply = async (comment_id, reply_data) => {
    try {
        const response = await api.post(`/api/comments/${comment_id}/replies/`, reply_data);
        return await response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error;
    }
}


// function to delete a comment or reply ( reply is taking as a comment object whose parent is a comment )
export const deleteComment = async (comment_id) => {
    try {
        const response = await api.delete(`/api/comments/${comment_id}/`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
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
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        console.error(error)
    }
}

export const unfollowUser = async (userId) => {
    try {
        const res = await api.delete(`/api/users/${userId}/unfollow/`)
        return res.data
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        throw error
    }
}


// get folllowings of a user 
export const fetchUserFollowings = async (userId) => {
    try {
        const response = await api.get(`/api/users/${userId}/followings`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
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
        if (error.response && error.response.status === 500) {
            window.location.href = '/server-error';
        }
        console.error('Error fetching user followers:', error);
        throw error;
    }
};