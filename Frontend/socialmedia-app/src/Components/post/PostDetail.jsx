import { MoreVert, Sort } from "@mui/icons-material";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { useContext, useEffect, useState } from "react";
import api from "../../Api";
import { CommentsContext } from "../../Contexts/CommentContext";
import Comments from "../comment/Comments";
import PostOptionMenu from "./PostOptionMenu";
import { SavePost } from "../../services/apiService";

// this post card component
export const Post = ({ initialPost, handleCommentsToggle }) => {
    const { commentsCount, setCommentsCount } = useContext(CommentsContext);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [post, setPost] = useState(initialPost);
    const [likeCount, setLikeCount] = useState(post.likes_count);
    const [isLiked, setisLiked] = useState(post.isLiked);

    const handleSave = async () => {
        setPost((prevPost) => ({
            ...prevPost,
            isSaved: !prevPost.isSaved
        }));

        try {
            const res = await SavePost(post.id);
            // console.log(res);
        } catch (error) {
            setPost((prevPost) => ({
                ...prevPost,
                isSaved: !prevPost.isSaved
            }));
            console.error(error);
        }
    };



    const handleReport = () => {
        // Logic to report the post
        console.log('Reporting post');
    };

    const handleShare = () => {
        // Logic to share the post
        console.log('Sharing post');
    };


    const handleRemovPost = async () => {
        try {
            const res =
                console.log('Post deleted');
        } catch (error) {
            console.error(error);
        }
    };


    const handleUpdatePost = async () => { };

    const likeHandler = async () => {
        // setLikeCount(prevCount => prevCount + 1);  
        try {
            await api.post(`/api/posts/${post.id}/toggle-like/`);

            if (isLiked) {
                setLikeCount(prevCount => prevCount - 1);
                setisLiked(false);
            }
            else {
                setLikeCount(prevCount => prevCount + 1);
                setisLiked(true);
            }
            console.log(likeCount)
        }
        catch (error) {
            console.error(error);
        }
        // setLikeCount(2);  
        console.log('liked')
    }

    const postPublishTime = formatDistanceToNow(new Date(post.publish_time), { addSuffix: true });
    return <>
        <div className="post-card-top  flex items-center justify-between">
            <div className="profile flex items-center space-x-3 cursor-pointer">
                <Link to={`/profile/${post.creator.id}`} className="flex space-x-3 items-center">
                    <img src={post.creator.profileImg} className="user-profileImg w-8 h-8 border rounded-[50%] object-cover" alt=".." />
                    <span className="username  ">{post.creator.username}</span>
                </Link>
                <span className="published time text-xs">{postPublishTime} </span>
            </div>
            <div className="postTopRight relative">
                <span className=" cursor-pointer p-1" onClick={() => setShowOptionsMenu(!showOptionsMenu)}>
                    <MoreVert fontSize="small" />
                </span>
                {showOptionsMenu && (
                    <div
                        className={`post-actions-menu absolute top-6 right-0 w-56 bg-white shadow-lg rounded-lg border border-gray-300 z-20 ${showOptionsMenu ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
                            }`}
                    >
                        <PostOptionMenu post={post} onReport={handleReport} onSave={handleSave} onShare={handleShare} onRemove={handleRemovPost} onUpdate={handleUpdatePost} />
                    </div>
                )}
            </div>
        </div>
        <div className="card-center">
            <img src={post.postImg && post.postImg} className="mt-2 w-full max-h-[400px] md:max-h-[500px] object-contain" />
            <p className="post-text mt-2">{post.text} </p>
        </div>
        <div className="post-card-bottom flex justify-between items-center">
            <div className="postLeftBottom flex space-x-2 items-center">
                <img className='likeIcon w-6 h-6  cursor-pointer' src="/src/assets/like.png" onClick={likeHandler} alt="" />
                <img className='likeIcon w-6 h-6  cursor-pointer' src="/src/assets/heart.png" onClick={likeHandler} alt="" />
                {/* <span className='postlikeCounter text-[15px]'>{post.likes > 0 && `${post.likes} people like it`}</span> */}
                <span className='postlikeCounter text-[15px]'>{likeCount > 0 && `${likeCount} people liked it`}</span>
            </div>

            {handleCommentsToggle ?
                <div className="postRightBottom">
                    <span onClick={() => handleCommentsToggle()} className="postComment  cursor-pointer text-[15px]   ">
                        <ChatBubbleOutlineIcon />  {commentsCount > 0 && ` ${commentsCount} comments`}
                    </span>
                </div> : (<div className="postRightBottom">
                    <span className="postComment  cursor-pointer text-[15px]   ">
                        <ChatBubbleOutlineIcon /> {commentsCount > 0 && ` ${commentsCount} comments`}
                    </span>
                </div>)
            }
        </div>
    </>
}



// post detail(main) component 
export default function PostDetail({ post }) {
    const [isBgBlur, setIsBgBlur] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleCommentsToggle = () => {
        setIsBgBlur(!isBgBlur);
        setShowComments(!showComments);
    }
    useEffect(() => {
        // Toggle the body's overflow style based on isBgBlur state
        document.body.style.overflow = isBgBlur ? 'hidden' : 'auto';

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }), [isBgBlur]


    return (
        <>
            {isBgBlur &&
                <span onClick={() => handleCommentsToggle()} className="w-[100vw] h-[140vh] fixed bg-gray-600 -top-10  left-0 z-30 opacity-40"></span>
            }
            <div id={"post" + post.id} className="post-card p-4 custom-shodow-b rounded-lg  flex-col flex space-y-5 lg:space-y-6">
                <Post initialPost={post} handleCommentsToggle={handleCommentsToggle} />
                {showComments &&
                    <div className="post-comments bg-gray-100 rounded-xl p-4 fixed top-[10%]  left-1/2 -translate-x-1/2 xl:w-[45%] lg:w-[60%] md:w-[75%] w-full  h-full z-40">
                        <Comments closeComments={handleCommentsToggle} post={post} />
                    </div>
                }
            </div>
        </>
    )
}
