import api from "../Api"


// post related

// get posts

// create post

// edit post


//////////// follower related /////////////////

// follow a user
const followUser = async (userId) => {
    try {
        const res = await api.post('/api/follow/', { userId })
        // if (res.status === 200){
        return res.data
        // }
    } catch (error) {
        console.error(error)
    }
}
const unfollowUser = async (userId) => {
    try {
        const res = await api.post(`/api/unfollow/${userId}/`)
        // if (res.status === 200){
        return res.data
        // }
    } catch (error) {
        throw error
    }
}

export { followUser, unfollowUser };