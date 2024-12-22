import { useEffect, useState } from "react";
import SharePost from "../post/SharePost";
import api from "../../Api";
import PostList from "../post/PostList";
import { fetchPosts } from "../../services/apiService";


export default function Feed() {

    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        try {
            const data = await fetchPosts();
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
        // console.log(posts);
    }


    // // function to update posts state when removed a post
    // const handleRemovePost = (post_id) => {
    //     const updatedPosts = posts.filter(post => post.id !== post_id)
    //     setPosts(updatedPosts)
    // }

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className="feed-container  p-5">
            <div className="feed-wrapper">
                <SharePost posts={posts} setPosts={setPosts} />
                <div className="feed-posts mt-5">
                    <PostList posts={posts} />
                </div>
            </div>
        </div>
    )
}

