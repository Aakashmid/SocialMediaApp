import { Send } from '@mui/icons-material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CommentsContext } from '../Contexts/CommentContext';
import { ProfileDataContext } from '../Contexts/ProfileContext';
import { createComment, createReply, deleteComment, fetchReplies, likeCommentReply } from '../services/apiService';
// todo of this function - give option to like comment, reply , and remove comment option for commented user 


export const CommentInput = ({ post, replyProps = {} }) => {  // here some props are for replies and some for comments
    // Destructure with default values
    const {
        isReply = false,
        setReplies = () => [],
        setRepliesCount = () => 0,
        comment_id = null
    } = replyProps;
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
                    const newReply = await createReply(comment_id, message);
                    console.log('reply posted');
                    setReplies((prevReplies) => [...prevReplies, newReply]);
                    setRepliesCount((prevCount) => prevCount + 1) // update reply count when new reply is added
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
                {/* <input onKeyUp={(e) => { if (e.key === "Enter") { handleSubmit(e) } }} type="text" className={`${isReply ? 'bg-gray-200 w-full px-2 text-sm font-normal py-[3px] outline-none' : 'bg-gray-200 w-full p-2 outline-none'}`} onChange={handleInputTextChange} value={inputText} /> */}
                <input type="text" className={`${isReply ? 'bg-gray-200 w-full px-2 text-sm font-normal py-[3px] outline-none' : 'bg-gray-200 w-full p-2 outline-none'}`} onChange={handleInputTextChange} value={inputText} />
                <button type='submit' className='sent-btn p-1 '><span className=""><Send fontSize={`${isReply ? 'small' : 'medium'}`} className={`${inputText !== "" ? 'text-bgPrimary' : 'text-gray-500'}`} /></span></button>
            </form>
        </div>
    </>
}



export const CommentUserCard = ({ comment , setParentReplies, setParentRepliesCount }) => {
    const { profileData } = useContext(ProfileDataContext);
    const { setComments, setCommentsCount } = useContext(CommentsContext);
    const [replies, setReplies] = useState([]);
    const [repliesCount, setRepliesCount] = useState(comment.replies_count);
    const [likesCount, setLikesCount] = useState(comment.likes_count);
    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    const navigate = useNavigate();

    // Fetch replies for the current comment
    const getReplies = async (comment_id) => {
        if (!replies.length) {
            try {
                const data = await fetchReplies(comment_id);
                setReplies(data);
            } catch (error) {
                console.error("Error fetching replies:", error.message);
            }
        }
        setShowReplies((prev) => !prev);
    };

    // Handle like/unlike for the comment
    const handleLike = async (comment_id) => {
        try {
            const res = await likeCommentReply(comment_id);
            setLikesCount((prev) => (res.liked ? prev + 1 : prev - 1));
            setIsLiked(res.liked);
            const newCount = res.liked? likesCount+1:likesCount-1;
            // // Update like count in parent comments
            setComments((prevComments) =>
                prevComments.map((c) =>
                    c.id === comment_id ? { ...c, likes_count:newCount, isLiked: res.liked } : c
                )
            );
        } catch (error) {
            console.error("Error liking comment:", error.message);
        }
    };

    // Handle delete for the comment or reply  (comment can also be reply )
    const handleDeleteComment = async (comment_id) => {
        try {
            await deleteComment(comment_id);
            if (comment.parent > 0) {
                // Update parent replies when a reply is deleted
                setParentReplies((prevReplies)=>prevReplies.filter((r)=>r.id != comment_id));
                setParentRepliesCount((prev)=>prev-1);
                // setReplies((prevReplies) => prevReplies.filter((r) => r.id !== comment_id));
                // setRepliesCount((prev) => prev - 1);
            } else {
                // Update comments when a comment is deleted
                setComments((prevComments) => prevComments.filter((c) => c.id !== comment_id));
                setCommentsCount((prev) => prev - 1);
            }
        } catch (error) {
            console.error("Error deleting comment:", error.message);
        }
    };

    return (
        <div className="flex space-x-4">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(`/profile/${comment.user.id}`)}>
                <img src={comment.user.profileImg} className="w-6 h-6 object-cover rounded-[50%]" alt=".." />
            </div>
            <div className="flex flex-col w-full">
                <p className={`${comment.parent > 0 && 'text-sm'} font-medium`}>{comment.user.username}</p>
                <p className="text-sm">{comment.text}</p>
                <div className="mt-1 flex space-x-4">
                    {/* Like Button */}
                    <div className="like-div flex items-center space-x-1">
                        <button
                            className="like-btn text-xs font-medium text-gray-500 hover:text-gray-600"
                            onClick={() => handleLike(comment.id)}
                        >
                            {isLiked ? <ThumbUpAltIcon fontSize="small" /> : <ThumbUpOffAltIcon fontSize="small" />}
                        </button>
                        {likesCount > 0 && (
                            <span className="font-medium text-[13px] text-gray-500 hover:text-gray-600">
                                Likes ({likesCount})
                            </span>
                        )}
                    </div>

                    {/* Reply Button */}
                    <button
                        className="reply-btn text-[13px] font-medium text-gray-500 hover:text-gray-600"
                        onClick={() => setShowReplyInput((prev) => !prev)}
                    >
                        Reply
                    </button>

                    {/* Replies Button */}
                    {repliesCount > 0 && (
                        <button
                            className="reply-btn text-[13px] font-medium text-gray-500 hover:text-gray-600"
                            onClick={() => getReplies(comment.id)}
                        >
                            Replies ({repliesCount})
                        </button>
                    )}

                    {/* Delete Button */}
                    {comment.user.id === profileData.id && (
                        <button
                            className="delete-btn text-xs font-medium text-gray-500 hover:text-gray-600"
                            onClick={() => handleDeleteComment(comment.id)}
                        >
                            Delete
                        </button>
                    )}
                </div>

                {/* Replies Section */}
                {showReplies && (
                    <div className="replies-wrapper flex flex-col py-2 space-y-2">
                        {replies.map((reply) => (
                            <CommentUserCard key={reply.id} comment={reply} setParentReplies={setReplies} setParentRepliesCount={setRepliesCount}/>
                        ))}
                    </div>
                )}

                {/* Reply Input */}
                {showReplyInput && (
                    <CommentInput
                        replyProps={{
                            isReply: true,
                            setReplies,
                            setRepliesCount,
                            comment_id: comment.id,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

