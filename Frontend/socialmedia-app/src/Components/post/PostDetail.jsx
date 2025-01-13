import { Close, MoreVert } from "@mui/icons-material";
import { formatDistanceToNow, set } from 'date-fns';
import { Link, Navigate, useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useContext, useEffect, useState } from "react";
import api from "../../Api";
import { CommentsContext } from "../../Contexts/CommentContext";
import Comments from "../comment/Comments";
import PostOptionMenu from "./PostOptionMenu";
import { SavePost } from "../../services/apiService";
import { PostContext } from "../../Contexts/PostContext";


const Post = ({ initialPost, handleCommentsToggle }) => {
    const { commentsCount } = useContext(CommentsContext);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const { posts, setPosts } = useContext(PostContext);
    const [post, setPost] = useState(initialPost);
    const [likeCount, setLikeCount] = useState(post.likes_count);
    const [isLiked, setIsLiked] = useState(post.isLiked);

    const navigate = useNavigate();

    // const [showAlert, setShowAlert] = useState(true);
    const [showAlert, setShowAlert] = useState({ show: false, message: '' });

    const AlertPopover = () => {
        useEffect(() => {
            if (showAlert) {
                const timer = setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
                return () => clearTimeout(timer);
            }
        }, [showAlert]);

        return (
            <div
                className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-3 rounded-md shadow-lg z-50 transition-opacity duration-300 ease-in-out ${showAlert.show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="flex items-center gap-2">
                    <span>{showAlert.message}</span>
                </div>
            </div>
        );
    };


    // incomplete
    const handleSave = async () => {
        const postId = post.id;
        setPost(prevPost => ({ ...prevPost, isSaved: !prevPost.isSaved }));

        try {
            await SavePost(postId);
            // Only update the specific post in the list
            // setPosts(prevPosts => {
            //     const postIndex = prevPosts.findIndex(p => p.id === postId);
            //     if (postIndex === -1) return prevPosts;

            //     const newPosts = [...prevPosts];
            //     newPosts[postIndex] = { ...newPosts[postIndex], isSaved: !newPosts[postIndex].isSaved };
            //     return newPosts;
            // });
            setShowAlert({ show: true, message: !post.isSaved ? 'Post saved successfully!' : 'Post removed from saved posts.' });
        } catch (error) {
            setPost(prevPost => ({ ...prevPost, isSaved: !prevPost.isSaved }));
            console.error(error);
        }
    };

    const handleReport = () => console.log('Reporting post');
    const handleShare = () => console.log('Sharing post');



    //  incompolete
    const handleUpdatePost = async (post_data) => {
        if (post_data) {
            try {
                // const response = await api.put(`/api/posts/${post.id}/`, post_data);
                // setPost(response.data);
                // setShowEditModal(false);
                console.log('updated')
            } catch (error) {
                console.error(error);
            }
        } else {
            // setShowEditModal(!showEditModal);
        }
    };

    const likeHandler = async () => {
        try {
            await api.post(`/api/posts/${post.id}/toggle-like/`);
            setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error(error);
        }
    };


    // createing  post slug for url
    const createSlug = (post) => {
        const creatorName = post.creator.username || 'user';
        const combinedString = `${creatorName}-${post.text}`;

        return combinedString
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 60); // Increased length to accommodate username
    };


    const postPublishTime = formatDistanceToNow(new Date(post.publish_time), { addSuffix: true });
    return (
        <>
            <AlertPopover />
            <div className="post-card-top flex items-center justify-between ">
                <div className="profile flex items-center space-x-3 cursor-pointer">
                    <Link to={`/profile/${post.creator.username}`} state={{ userId: post.creator.id }} className="flex space-x-3 items-center">
                        <img src={post.creator.profileImg} className="user-profileImg w-8 h-8 border rounded-[50%] object-cover" alt="Profile" />
                        <span className="username">{post.creator.username}</span>
                    </Link>
                    <span className="published time text-xs">{postPublishTime}</span>
                </div>
                <div className="postTopRight relative">
                    <span className="cursor-pointer p-1 rounded-3xl hover:bg-gray-300" onClick={() => setShowOptionsMenu(!showOptionsMenu)}>
                        <MoreVert fontSize="small" />
                    </span>
                    {showOptionsMenu && (
                        <div className={`post-actions-menu absolute top-6 right-0 w-56 bg-white shadow-lg rounded-lg border border-gray-300 z-20  ${showOptionsMenu ? "opacity-100 translate-x-0" : "-translate-x-full"}`}>
                            <PostOptionMenu
                                post={post}
                                onReport={handleReport}
                                onSave={handleSave}
                                onShare={handleShare}
                                onUpdate={() => navigate(`/post/${createSlug(post)}/edit`, { state: { initialPost: post } })}
                                onClose={() => setShowOptionsMenu((prev) => !prev)}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="card-center mt-2">
                {post.postImg && <img src={post.postImg} className=" w-full max-h-[400px] lg:max-h-[500px] object-contain  " alt="Post" />}
                <p className="post-description mt-2">{post.text}</p>
            </div>


            <div className="post-card-bottom flex justify-between items-center">
                <div className="postLeftBottom flex space-x-2 items-center">
                    <img className="likeIcon w-6 h-6 cursor-pointer" src="/images/like.png" onClick={likeHandler} alt="Like" />
                    <img className="likeIcon w-6 h-6 cursor-pointer" src="/images/heart.png" onClick={likeHandler} alt="Heart" />
                    {likeCount > 0 && <span className="postlikeCounter text-[15px]">{likeCount} people liked it</span>}
                </div>
                <div className="postRightBottom">
                    <span
                        onClick={handleCommentsToggle && handleCommentsToggle}
                        className="postComment cursor-pointer text-[15px]"
                    >
                        <ChatBubbleOutlineIcon />
                        {commentsCount > 0 && ` ${commentsCount} comments`}
                    </span>
                </div>
            </div>
        </>
    );
};


const PostDetail = ({ post }) => {
    const [isBgBlur, setIsBgBlur] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleCommentsToggle = () => {
        setIsBgBlur(!isBgBlur);
        setShowComments(!showComments);
    };

    useEffect(() => {
        document.body.style.overflow = isBgBlur ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isBgBlur]);

    return (
        <>
            {isBgBlur && (
                <span
                    onClick={handleCommentsToggle}
                    className="w-[100vw] h-[140vh] fixed bg-gray-600 -top-10 left-0 z-30 opacity-40"
                />
            )}
            <div id={`post${post.id}`} className="post-card p-4 custom-shodow-b rounded-lg ">
                <Post initialPost={post} handleCommentsToggle={handleCommentsToggle} />
                {showComments && (
                    <div className="post-comments bg-gray-100 rounded-xl p-4 fixed top-10 left-1/2 -translate-x-1/2 lg:w-[40%]  md:w-[75%] w-full h-full z-40">
                        <Comments closeComments={handleCommentsToggle} post={post} />
                    </div>
                )}
            </div>
        </>
    );
};

export { Post };
export default PostDetail;