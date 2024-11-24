import { useEffect, useState } from "react";
import Post from "./PostDetail";
import SharePost from "./SharePost";
import api from "../Api";
import Posts from "./Posts";


export default function Feed({ currentUser }) {

    const [posts, setPosts] = useState([])
    const getPosts = () => {
        api.get('api/posts/').then((res) => {
            if (res.status === 200) {
                console.log('ok')
                setPosts(res.data)
            }
        }).catch((error) => {
            console.log(error)
        })
        // console.log(posts);
    }

    // Create post
    const creatPost = (data) => {
        api.post('api/posts/', data).then((res) => {
            if (res.status === 201) {
                console.log('post created ')
                getPosts()
            }
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    useEffect(() => {
        getPosts()
        // console.log(posts)
    }, [])
    return (
        <div className="feed-container  p-5">
            <div className="feed-wrapper">
                <SharePost onShare={creatPost} />
                <div className="feed-posts mt-5">
                    <Posts posts={posts} />
                </div>
            </div>
        </div>
    )
}
