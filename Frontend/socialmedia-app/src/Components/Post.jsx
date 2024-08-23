import { MoreVert } from "@mui/icons-material";

export default function Post({ post }) {
    const likeHandler = () => {
        console.log('liked')
    }
    return (
        <div className="post-card p-4 custom-shodow-b rounded-lg mb-8 flex-col flex space-y-5 lg:space-y-6">
            <div className="post-card-top  flex items-center justify-between">
                <div className="profile flex items-center space-x-3 cursor-pointer">
                    <img src={post.author.profileImg} className="user-profileImg w-7 h-7 rounded-[50%] object-cover" alt=".." />
                    <span className="username text-sm ">{post.author.username}</span>
                    <span className="published time text-xs">{post.publish_time} </span>
                </div>
                <div className="postTopRight p-1 cursor-pointer">
                    <MoreVert fontSize="small" />
                </div>
            </div>
            <div className="card-center">
                <p className="post-text">{post.text} </p>
                <img src={post.postImg && post.postImg} className="mt-4 w-full max-h-[400px] md:max-h-[500px] object-contain" />
            </div>
            <div className="post-card-bottom flex justify-between items-center">
                <div className="postLeftBottom flex space-x-2 items-center">
                    <img className='likeIcon w-6 h-6  cursor-pointer' src="src/assets/like.png" onClick={likeHandler} alt="" />
                    <img className='likeIcon w-6 h-6  cursor-pointer' src="src/assets/heart.png" onClick={likeHandler} alt="" />
                    <span className='postlikeCounter text-[15px]'>{post.likes > 0 && `${post.likes} people like it`}</span>
                </div>
                <div className="postRightBottom"><span className="postComment border-b-[3px] cursor-pointer text-[15px] border-dotted ">{post.comments > 0 && `{post.comments} comments`} </span></div>
            </div>
        </div>
    )
}
