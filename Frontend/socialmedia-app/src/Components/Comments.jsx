import { Close, MoreVert } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Post } from './post/PostDetail';
import { createComment, fetchComments } from '../services/apiService';
import { CommentInput, CommentUserCard } from './CommentComponents';
import { ProfileDataContext } from '../Contexts/ProfileContext';

export default function Comments({ post, closeComments , setCommentsCount }) {
    const [comments, setComments] = useState([]);
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    // function to get all comments of a post 
    const getComments = async (post_id) => {
        try {
            const data = await fetchComments(post_id);
            console.log(data)
            setComments(data);
        } catch (error) {
            console.error(error);
        }
    }



    // function to handle comment on a post 
    const handleComment = async (comment_data) =>{
        // console.log('handliing comment on post')
        try {
            const data= await createComment(post.id,comment_data);
            console.log(data);
            setComments([...comments,data])
            setCommentsCount(post.comments_count + 1) // update comment count when new comment is added
        } catch (error) {
            console.log(error);
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
                    <Post post={post} />
                </div>
                <div className="comments-wrapper flex space-y-2 flex-col py-3 xl:px-6 lg:px-2 ">
                    {comments.map((comment) => {
                        return <CommentUserCard key={comment.id} comment={comment} />
                    })}
                </div>
            </div>
            <div className="comment-input border-t  absolute   bottom-20  left-0 bg-[#F8F9FA] w-full h-20  ">
                <CommentInput onComment={handleComment} user={profileData} />
            </div>
        </div>
    )
}
