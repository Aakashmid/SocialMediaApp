import { useEffect, useState } from "react";
import SharePost from "../post/SharePost";
import PostList from "../post/PostList";
import { fetchPosts } from "../../services/apiService";
import { PostProvider } from "../../Contexts/PostContext";
import { CircleLoader } from "../Loader";


export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const getPosts = async () => {
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
                <div className="feed-posts ">
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

