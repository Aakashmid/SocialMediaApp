import { MoreVert, Sort } from "@mui/icons-material";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Comments from "../Comments";
import { useContext, useEffect, useState } from "react";
import api from "../../Api";
import { CommentsContext } from "../../Contexts/CommentContext";

// this post detail component
export const Post = ({ post, handleCommentsToggle  }) => {
    ///  this is post card 
    const {commentsCount, setCommentsCount} = useContext(CommentsContext);
    const [likeCount, setLikeCount] = useState(post.likes_count);
    const [isLiked, setisLiked] = useState(post.isLiked);
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
    console.log(commentsCount);
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
            <div className="postTopRight p-1 cursor-pointer">
                <MoreVert fontSize="small" />
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
                <Post post={post}  handleCommentsToggle={handleCommentsToggle} />
                {showComments &&
                    <div className="post-comments bg-gray-100 rounded-xl p-4 fixed top-[10%]  left-1/2 -translate-x-1/2 xl:w-[45%] lg:w-[60%] md:w-[75%] w-full  h-full z-40">
                        <Comments   closeComments={handleCommentsToggle} post={post} />
                    </div>
                }
            </div>
        </>
    )
}
