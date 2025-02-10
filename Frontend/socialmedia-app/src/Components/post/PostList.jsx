import { useContext, useState } from "react";
import { CommentsContextProvider } from "../../Contexts/CommentContext"
import PostDetail from "./PostDetail"
import { DeletePost } from "../../services/apiService";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import { PostContext } from "../../Contexts/PostContext";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";

export default function PostList() {
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    const { posts, setPosts } = useContext(PostContext);


    return (
        <div className="posts flex flex-col  gap-2">
            {!posts ? (
                <>
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                    <PostCardSkeleton/>
                </>
            ) : (
                posts.map((post) => (
                    <CommentsContextProvider key={post.id} initialCommentsCount={post.comments_count}>
                        <PostDetail key={post.id} post={post} />
                    </CommentsContextProvider>
                ))
            )} 
        </div>
    )
}