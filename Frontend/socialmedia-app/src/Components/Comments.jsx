import { Close, MoreVert } from '@mui/icons-material'
import React, { useState } from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Comments({ post, closeComments }) {

    const CommentUserCard = () => {
        return (
            <div className='flex space-x-4'>
                <div className="flex-shrink-0 cursor-pointer" onClick={()=>window.location.href=`/profile/{user.id}`}>
                    <img src="src/assets/person/1.jpeg" className='w-8 h-8 object-cover rounded-xl' alt="" />
                </div>
                {/* <div className="profile-image-user"><img className='w-10 h-10' src={post.creator.profileImg} alt="" /></div> */}
                <div className="flex flex-col  flex-grow-0">
                    <p className=" font-medium">UserName</p>
                    <p className="text-sm ">Comment content Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium alias cumque at rem quia et ab saepe consequuntur consectetur dolore quibusdam numquam tempora dolorum veritatis, voluptatem ipsam consequatur modi. Itaque molestias temporibus dicta magni saepe aliquam iure dolor facere perspiciatis!</p>
                    <div className="mt-2 "></div>
                </div>
            </div>
        )
    }


    const CommentPost = () => {
        const [likeCount, setLikeCount] = useState(post.likes);
        const likeHandler = () => {
            console.log('liked')
        }
        const postPublishTime = formatDistanceToNow(new Date(post.publish_time), { addSuffix: true });
        return (
            <>
                <div id={"post" + post.id} className="post-card p-4 border rounded-lg  flex-col flex space-y-5 lg:space-y-6">
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

                        <div className="postRightBottom">
                            <span className="postComment  cursor-pointer text-[15px]  ">
                                {post.comments > 0 && `${post.comments}`}  <ChatBubbleOutlineIcon />
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>

            <div className="flex justify-between items-center">
                <span className="h-10  w-9"></span>
                <p className='font-medium lg:text-2xl text-xl'>
                    {post.creator.username}'s comments
                </p>
                <span onClick={() => closeComments()} className='py-[6px] px-2 bg-gray-200 rounded-[50%]'><Close /></span>
            </div>
            <hr className="my-2" />
            <div className=" h-full overflow-y-scroll">
                <div className="">
                    <CommentPost post={post} />
                </div>
                <div className="comments-wrapper flex space-y-2 flex-col py-3 xl:px-6 lg:px-2 mb-52">
                    <CommentUserCard />
                    <CommentUserCard />
                    <CommentUserCard />
                    <CommentUserCard />
                    <CommentUserCard />
                    <CommentUserCard />
                </div>
            </div>
            <div className="comment-input border-t border-gray-400  h-40 absolute bottom-0 bg-white w-full left-0">
                <input type="text" />
            </div>
        </>
    )
}
