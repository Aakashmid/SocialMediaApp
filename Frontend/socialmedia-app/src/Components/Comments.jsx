import { Close, MoreVert } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import { Post } from './PostDetail';
import { fetchComments } from './apiService';

const CommentUserCard = ({comment}) => {
    return (
        <div className='flex space-x-4'>
            <div className="flex-shrink-0 cursor-pointer" onClick={()=>window.location.href=`/profile/${user.id}`}>
                <img src={comment.user.profileImg} className='w-8 h-8 object-cover rounded-xl' alt=".." />
            </div>
            <div className="flex flex-col  flex-grow-0">
                <p className=" font-medium">{comment.user.username}</p>
                <p className="text-sm ">{comment.text}</p>
                <div className="mt-2 "></div>
            </div>
        </div>
    )
}


export default function Comments({ post, closeComments }) {
    const [comments, setComments] = useState([]);

    // function to get all comments of a post 
    const getComments = async (post_id) =>{
        try {
            const data =await fetchComments(post_id);
            console.log(data)
            setComments(data);
        } catch (error) {
            console.error(error);
        }
   }


   // function to handle comment on a post 
    // const postComment = async (post_id) =>{
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

    useEffect(() => {
        getComments(post.id);
    },[post])
    return (
        <>
            <div className="flex justify-between items-center">
                <span className="h-10  w-9"></span>
                <p className='font-medium lg:text-2xl text-xl'>
                    {post.creator.username}'s comments
                </p>
                <span onClick={() => closeComments()} className='py-[6px] px-2 bg-gray-200 rounded-[50%] cursor-pointer'><Close /></span>
            </div>
            <hr className="my-2" />
            <div className=" h-full overflow-y-scroll">
                <div className="p-2">
                    <Post post={post} />
                </div>
                <div className="comments-wrapper flex space-y-2 flex-col py-3 xl:px-6 lg:px-2 mb-52">
                    {comments.map((comment) =>{
                        return <CommentUserCard key={comment.id} comment={comment}/>
                    })}
                </div>
            </div>
            <div className="comment-input border-t border-gray-400  h-40 absolute bottom-0 bg-white w-full left-0">
                <input type="text" />
            </div>
        </>
    )
}
