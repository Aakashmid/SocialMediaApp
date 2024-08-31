import { useEffect, useState } from "react";
import Post from "./Post";
import SharePost from "./SharePost";
import api from "../Api";


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
    }

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
        console.log(posts)
    }, [])
    return (
        <div className="feed-container  p-5">
            <div className="feed-wrapper">
                <SharePost onShare={creatPost} />
                <div className="posts mt-8 flex flex-col space-y-4">
                    {posts.map((post) => {
                        return <Post key={post.id} post={post} />
                    })}
                </div>
            </div>
        </div>
    )
}
