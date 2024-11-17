import { MoreVert } from "@mui/icons-material";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
export default function Post({ post }) {
    const likeHandler = () => {
        console.log('liked')
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
                <div className="postRightBottom"><span className="postComment border-b-[3px] cursor-pointer text-[15px] border-dotted ">{post.comments > 0 && `${post.comments}`}  comments </span></div>
            </div>
        </div>
    )
}
