import { useEffect, useState } from "react";
import SharePost from "./SharePost";
import api from "../Api";
import Posts from "./Posts";
import { fetchPosts } from "./apiService";


export default function Feed({ currentUser }) {

    const [posts, setPosts] = useState([])
    const getPosts =async () => {
        try {
            const data = await fetchPosts();
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
        // console.log(posts);
    }


    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className="feed-container  p-5">
            <div className="feed-wrapper">
                <SharePost posts={posts} setPosts={setPosts} />
                <div className="feed-posts mt-5">
                    <Posts posts={posts} />
                </div>
            </div>
        </div>
    )
}
