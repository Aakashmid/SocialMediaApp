import { useContext, useEffect, useState } from "react";
import SharePost from "../post/SharePost";
import api from "../../Api";
import PostList from "../post/PostList";
import { fetchPosts } from "../../services/apiService";
import { PostContext, PostProvider } from "../../Contexts/PostContext";
import { use } from "react";
import { CircleLoader } from "../Loader";


export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const getPosts = async () => {
        console.log('fetching home posts');
        try {
            setLoading(true);
            const data = await fetchPosts();
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }


    // // function to update posts state when removed a post
    // const handleRemovePost = (post_id) => {
    //     const updatedPosts = posts.filter(post => post.id !== post_id)
    //     setPosts(updatedPosts)
    // }

    useEffect(() => {
        if (posts.length === 0) {
            getPosts()
        }
    }, [])
    // console.log(posts)
    return (
        <div className="feed-container  p-5">
            <div className="feed-wrapper">
                <SharePost setPosts={setPosts} />
                <div className="feed-posts mt-5">
                    {/* <PostProvider posts={posts} setPosts={setPosts}> */}
                    {loading ? <CircleLoader /> :
                        <PostProvider value={{ posts, setPosts }}>
                            <PostList />
                        </PostProvider>
                    }
                </div>
            </div>
        </div>
    )
}

