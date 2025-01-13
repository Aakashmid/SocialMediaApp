import { useContext, useState } from "react";
import { CommentsContextProvider } from "../../Contexts/CommentContext"
import PostDetail from "./PostDetail"
import { DeletePost } from "../../services/apiService";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import { PostContext } from "../../Contexts/PostContext";
// list all posts
// export default function PostList({ posts, setPosts }) {
export default function PostList() {
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    const { posts, setPosts } = useContext(PostContext);

    const [isDeleted, setIsDeleted] = useState(false);

    const handleRemovePost = async (post) => {
        if (post !== null) {
            const isConfirmed = window.confirm("Are you sure you want to delete this post?");

            if (isConfirmed) {
                try {
                    const response = await DeletePost(post.id);
                    // console.log('Post deleted', post_id);
                    setIsDeleted(true);
                    setPosts((prevPosts) => prevPosts.filter(prev_post => prev_post.id !== post.id));
                    setTimeout(() => setIsDeleted(false), 3000); // Hide message after 3 seconds
                    if (post.creator.id === profileData.id) {
                        setProfileData((prevData) => ({
                            ...prevData,
                            posts_count: prevData.posts_count - 1,
                        }));
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);


    // const confirmDelete = async () => {
    //     try {
    //         // const response = await api.delete(`/api/posts/${postToDelete}/`);
    //         // console.log(response.data);
    //         console.log('Post deleted', postToDelete);
    //         setIsDeleted(true);
    //         setTimeout(() => setIsDeleted(false), 3000);
    //         setShowDeleteModal(false);
    //         setPostToDelete(null);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const cancelDelete = () => {
    //     setShowDeleteModal(false);
    //     setPostToDelete(null);
    // };

    return (
        <div className="posts  flex flex-col space-y-4">
            <div className="fixed bottom-5  z-30">
                {isDeleted && (
                    <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
                        Post deleted successfully!
                    </div>
                )}
            </div>

            {(posts || []).map((post) => {
                return (
                    <CommentsContextProvider key={post.id} initialCommentsCount={post.comments_count}>   {/* for mananging comments related states*/}
                        <PostDetail key={post.id} post={post} />
                    </CommentsContextProvider>
                )
            })}
        </div>
    )
}
