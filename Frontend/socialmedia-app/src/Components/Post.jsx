import { MoreVert, Sort } from "@mui/icons-material";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Comments from "./Comments";
import { useState } from "react";
export default function Post({ post }) {
    const [likeCount, setLikeCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const likeHandler = () => {
        console.log('liked')
    }

    const handleCommentsToggle = () => {
        setShowComments(!showComments);
    }
    const postPublishTime = formatDistanceToNow(new Date(post.publish_time), { addSuffix: true });
    return (
        <div id={"post" + post.id} className="post-card p-4 custom-shodow-b rounded-lg  flex-col flex space-y-5 lg:space-y-6">
            <div className="post-card-top  flex items-center justify-between">
                <div className="profile flex items-center space-x-3 cursor-pointer">
                    <Link to={`/profile/${post.creator.id}`} className="flex space-x-3 items-center">
                        <img src={post.creator.profileImg} className="user-profileImg w-7 h-7 border rounded-[50%] object-cover" alt=".." />
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
                    <span className='postlikeCounter text-[15px]'>{post.likes > 0 && `${post.likes} people like it`}</span>
                </div>
                <div className="postRightBottom"><span onClick={() =>handleCommentsToggle()} className="postComment  cursor-pointer text-[15px]  ">{post.comments > 0 && `${post.comments}`}  <ChatBubbleOutlineIcon /> </span></div>
            </div>
            {showComments &&
                <div  className="post-comments bg-gray-100 rounded-xl p-4 fixed top-[20%] left-0 w-full h-full">
                    <Comments closeComments={handleCommentsToggle} post={post}/>
                </div>
            }
        </div>
    )
}
