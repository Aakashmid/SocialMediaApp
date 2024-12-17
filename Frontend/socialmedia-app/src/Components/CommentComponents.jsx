import { Send } from '@mui/icons-material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProfileDataContext } from '../Contexts/ProfileContext';
import { createComment, createReply, deleteComment, likeCommentReply } from '../services/apiService';
import { CommentsContext } from '../Contexts/CommentContext';

export const CommentInput = ({ post, replyProps }) => {  // here some props are for replies and some for comments
    const {isReply, setReplies, setRepliesCount , comment_id} = replyProps;
    const { setComments, setCommentsCount } = useContext(CommentsContext);
    const { profileData: user } = useContext(ProfileDataContext);
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const handleInputTextChange = (e) => {
        setInputText(e.target.value);
        // console.log(inputText);
    }

    // handle comment or reply sending
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit');
        if (inputText != "") {
            var message = new FormData();
            message.append('text', inputText);
            try {
                if (isReply) {
                    const newReply = await createReply(comment_id,inputText);
                    console.log('reply posted');
                }
                else {
                    const newComment = await createComment(post.id, message);
                    setComments((prevComments) => [...prevComments, newComment]);
                    setCommentsCount((prevCount) => prevCount + 1) // update comment count when new comment is added
                }
            } catch (error) {
                console.log(error);
            }
            // data.append('text',inputText);
            // onComment(data);
            setInputText("");
        }
    }

    return <>
        <div className={`${isReply ? 'py-2  flex items-center space-x-2' : 'py-2 px-3 flex items-center space-x-3'}`} >
            <div className="current-user-img" onClick={() => navigate(`/profile/${user.id}`)}>
                <img src={user.profileImg} className={`${isReply ? 'user-profileImg w-6 h-6 border rounded-[50%] object-cover' : "user-profileImg w-8 h-8 border rounded-[50%] object-cover"}`} alt=".." />

            </div>
            <form onSubmit={handleSubmit} className="text-input-form bg-gray-200 input-form flex-grow flex items-center rounded-lg overflow-hidden">
                <input onKeyUp={(e) => { if (e.key === "Enter") { handleSubmit() } }} type="text" className={`${isReply ? 'bg-gray-200 w-full px-2 text-sm font-normal py-[3px] outline-none' : 'bg-gray-200 w-full p-2 outline-none'}`} onChange={handleInputTextChange} value={inputText} />
                <button onClick={() => handleSubmit()} type='submit' className='sent-btn p-1 '><span className=""><Send fontSize={`${isReply ? 'small' : 'medium'}`} className={`${inputText !== "" ? 'text-bgPrimary' : 'text-gray-500'}`} /></span></button>
            </form>
        </div>
    </>
}




// todo of this function - give option to like comment, reply , and remove comment option for commented user 
export const CommentUserCard = ({ comment }) => {
    const { profileData } = useContext(ProfileDataContext);
    const { setComments, setCommentsCount } = useContext(CommentsContext);
    const [replies, setReplies] = useState([]);
    const [repliesCount, setRepliesCount] = useState(comment.replies_count);
    const [likesCount, setLikesCount] = useState(comment.likes_count);
    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [showReplyInput, setShowReplyInput] = useState(false);

    // const getReplies = async (comment_id)= >{
    //     try {
    //         const data = await fetchReplies(comment_id);
    //         setReplies(data.length);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // use optimistice like update (incomple)
    const handleLike = async (comment_id) => {  // handle like of reply and comment
        try {
            const res = await likeCommentReply(comment_id);
            // update like count when comment is liked
            console.log(res)
            if (res.liked) {
                setLikesCount((prevCount) => prevCount + 1);
                setIsLiked(true);
            }
            else {
                setLikesCount((prevCount) => prevCount - 1);
                setIsLiked(false);
            }
            // Update the context or parent component with the new like status
            setComments((prevComments) =>
                prevComments.map((c) => {
                    if (c.id === comment_id) {
                        const updatedLikesCount = res.liked ? c.likes_count + 1 : c.likes_count - 1;
                        return { ...c, likes_count: updatedLikesCount, isLiked: res.liked };
                    }
                    return c;
                })
            );
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleDeleteComment = async (comment_id) => {
        try {
            const res = await deleteComment(comment_id);
            console.log(res);
            setComments((prevComments) => prevComments.filter((c) => c.id !== comment_id));
            setCommentsCount((prevCount) => prevCount - 1); // update comment count when comment is deleted
        } catch (error) {
            console.error(error.message);
        }
    }
    const navigate = useNavigate();
    return (
        <div className='flex space-x-4'>
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(`/profile/${comment.user.id}`)}>
                <img src={comment.user.profileImg} className='w-6 h-6 object-cover rounded-[50%]' alt=".." />
            </div>
            <div className="flex flex-col  flex-grow-0 w-full">
                <div className="bg"></div>
                <p className=" font-medium">{comment.user.username}</p>
                <p className="text-sm">{comment.text}</p>
                <div className="mt-1 flex space-x-4">
                    <div className='like-div flex items-center space-x-1'>
                        <button className="like-btn text-xs font-medium text-gray-500 hover:text-gray-600" onClick={() => handleLike(comment.id)}>
                            {isLiked ? <ThumbUpAltIcon fontSize='small' /> : <ThumbUpOffAltIcon fontSize='small' />}
                        </button>

                        {likesCount > 0 && <span className="font-medium text-[13px] text-gray-500 hover:text-gray-600">Likes ({likesCount})</span>}
                    </div>
                    <button className="reply-btn text-[13px] font-medium text-gray-500 hover:text-gray-600" onClick={() => setShowReplyInput(!showReplyInput)}>
                        <span>Reply</span>
                    </button>
                    {repliesCount > 0 &&
                        <button className="reply-btn text-[13px] font-medium text-gray-500 hover:text-gray-600" onClick={() => getReplies(comment.id)}>
                            <span>Replies</span>
                            {comment.replies_count > 0 && <span className="text-xs">({comment.replies_count})</span>}
                        </button>
                    }
                    {comment.user.id === profileData.id &&
                        <button className="delete-btn text-xs font-medium text-gray-500 hover:text-gray-600" onClick={() => handleDeleteComment(comment.id)}><span>Delete</span></button>
                    }
                </div>
                {showReplyInput &&
                    <CommentInput  replyProps={{isReply:true ,setReplies:setReplies,setRepliesCount:setRepliesCount , comment_id:comment.id }}/> 
                }
            </div>
        </div>
    )
}


