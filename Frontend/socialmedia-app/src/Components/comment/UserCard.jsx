import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommentsContext } from "../../Contexts/CommentContext";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import { deleteComment, fetchReplies, likeCommentReply } from "../../services/apiService";
import CommentInputForm from "./CommentInputForm";

const UserCard = ({ comment, setParentReplies, setParentRepliesCount, isReply }) => {
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
            const newCount = res.liked ? likesCount + 1 : likesCount - 1;
            // // Update like count in parent comments
            setComments((prevComments) =>
                prevComments.map((c) =>
                    c.id === comment_id ? { ...c, likes_count: newCount, isLiked: res.liked } : c
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
                setParentReplies((prevReplies) => prevReplies.filter((r) => r.id != comment_id));
                setParentRepliesCount((prev) => prev - 1);
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
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(`/profile/${comment.user.username}`, { state: { userId: comment.user.id } })}>
                <img src={comment.user.profileImg} className={`${isReply ? 'w-7 h-7' : 'w-8 h-8'} object-cover rounded-[50%]`} alt=".." />
            </div>
            <div className="flex flex-col w-full">
                {/* <p onClick={() => navigate(`/profile/${comment.user.id}`)} className={`${comment.parent > 0 && 'text-[15px] '} font-medium cursor-pointer`}>{comment.user.username}</p> */}
                <p onClick={() => navigate(`/profile/${comment.user.id}`)} className={`${isReply && 'text-[15px'} font-medium cursor-pointer`}>{comment.user.username}</p>
                <p className={`${isReply ? 'text-[13px]' : 'text-sm'} font-normal`}>{comment.text}</p>
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
                            <UserCard key={reply.id} isReply={true} comment={reply} setParentReplies={setReplies} setParentRepliesCount={setRepliesCount} />
                        ))}
                    </div>
                )}

                {/* Reply Input */}
                {showReplyInput && (
                    <CommentInputForm
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

export default UserCard;