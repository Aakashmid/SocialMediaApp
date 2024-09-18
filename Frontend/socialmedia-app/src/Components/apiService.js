import api from "../Api"

export const fetchUserProfile = async (id) => {
    try {
        const response = await api.get(`/api/profile/${id}`);
        if (response.status != 200) {
            throw new Error('Failed to fetch user profile');
        }
        return await response.data;
    } catch (error) {
        throw error;
    }
};

// post related

// get posts

// create post

// edit post


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
