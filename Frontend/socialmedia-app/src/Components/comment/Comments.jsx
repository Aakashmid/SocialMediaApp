import { Close, MoreVert } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Post } from '../post/PostDetail';
import { fetchComments } from '../../services/apiService';
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import { CommentsContext } from '../../Contexts/CommentContext';
import CommentInputForm from './CommentInputForm';
import UserCard from './UserCard';

export default function Comments({ post, closeComments }) {
    const { comments, setComments } = useContext(CommentsContext);
    const { profileData } = useContext(ProfileDataContext);

    // function to get all comments of a post 
    const getComments = async (post_id) => {
        try {
            const data = await fetchComments(post_id);
            setComments(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getComments(post.id);
    }, [post])

    return (
        <div className=' h-full w-full flex flex-col '>
            <div className="flex justify-between items-center">
                <span className="h-10  w-9"></span>
                <p className='font-medium lg:text-2xl text-xl'>
                    {post.creator.username}'s comments
                </p>
                <span onClick={() => closeComments()} className='py-[6px] px-2 bg-gray-200 rounded-[50%] cursor-pointer'><Close /></span>
            </div>
            <hr className="my-2" />
            <div className="flex-1 overflow-y-scroll pb-40 "> {/* Add padding at the bottom to avoid overlapping with the fixed input */}
                <div className="p-2">
                    <Post initialPost={post} />
                </div>
                <div className="comments-wrapper flex space-y-2 flex-col py-3 xl:px-6 lg:px-2 ">
                    {comments.map((comment) => {
                        return <UserCard key={comment.id} comment={comment} />
                    })}
                </div>
            </div>
            <div className="comment-input border-t  absolute   bottom-20  left-0 bg-[#F8F9FA] w-full h-20  ">
                <CommentInputForm user={profileData} post={post} />
            </div>
        </div>
    )
}
