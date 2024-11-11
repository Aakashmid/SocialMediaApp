import api from "../Api"

export const fetchUserProfile = async (id) => {
    try {
        const response = await api.get(`/api/users/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch user profile');
        }
        return response.data;  // Axios automatically parses JSON
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// post related

// get posts
export const GetPostDetail = async (id) => {
    try {
        const response = await api.get(`/api/posts/${id}`);
        if (response.status!= 200) {
            throw new Error('Failed to fetch post detail');
        }
        return await response.data;
    } catch (error) {
        throw error;
    }
}


export const UpdatePost = async (id,post_data) =>{
    try {
        const response = await api.put(`/api/posts/${id}`, post_data);
        if (response.status!= 200) {
            throw new Error('Failed to update post');
        }
        return await response.data;
    } catch (error) {
        throw error;
    }
}


// create post
export const CreatePost = async (id,post_data) =>{
    try {
        const response = await api.post(`/api/posts/`, post_data);
        if (response.status!= 201) {
            throw new Error('Failed to create post');
        }
        return await response.data;
    } catch (error) {
        throw error;
    }
}



//////////// follower related /////////////////

// follow a user
export const followUser = async (userId) => {
    try {
        const res = await api.post('/api/follow/', { userId })
        // if (res.status === 200){
        return res.data
        // }
    } catch (error) {
        console.error(error)
    }
}

export const unfollowUser = async (userId) => {
    try {
        const res = await api.post(`/api/unfollow/${userId}/`)
        // if (res.status === 200){
        return res.data
        // }
    } catch (error) {
        throw error
    }
}
