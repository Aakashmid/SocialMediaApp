import { Send } from '@mui/icons-material';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ProfileDataContext } from '../Contexts/ProfileContext';
import { createComment } from '../services/apiService';
import { CommentsContext } from '../Contexts/CommentContext';

export const CommentInput = ({ user, post, isReply, setReplies, setRepliesCount }) => {  // here some props are for replies and some for comments
    const { setComments, setCommentsCount } = useContext(CommentsContext);
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const handleInputTextChange = (e) => {
        setInputText(e.target.value);
        // console.log(inputText);
    }

    // handle comment or reply sending
    const handleSubmit = async () => {
        console.log('handleSubmit');
        if (inputText != "") {
            var message = new FormData();
            message.append('text', inputText);
            try {
                if (isReply) {
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
        <div className="py-2 px-3 flex items-center space-x-3">
            <div className="current-user-img" onClick={() => navigate(`/profile/${user.id}`)}>
                {/* <img src={user.profileImg} className="user-profileImg w-8 h-8 border rounded-[50%] object-cover" alt=".." /> */}

            </div>
            <div className="bg-gray-200 commment-input-form flex-grow flex items-center rounded-lg overflow-hidden ">
                <input onKeyUp={(e) => { if (e.key === "Enter") { handleSubmit() } }} type="text" className='bg-gray-200 w-full p-2 outline-none' onChange={handleInputTextChange} value={inputText} />
                <button onClick={() => handleSubmit()} type='submit' className='sent-btn p-1 '><span className=""><Send className={`${inputText !== "" ? 'text-bgPrimary' : 'text-gray-500'}`} /></span></button>
            </div>
            {/* <form onSubmit={handleSubmit} className="text-input-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="text-input"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form> */}
        </div>
    </>
}



// todo of this function - give option to like comment, reply , and remove comment option for commented user 
export const CommentUserCard = ({ comment }) => {
    const { profileData } = useContext(ProfileDataContext);
    const [replies, setReplies]
    const navigate = useNavigate();
    return (
        <div className='flex space-x-4'>
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(`/profile/${comment.user.id}`)}>
                <img src={comment.user.profileImg} className='w-6 h-6 object-cover rounded-[50%]' alt=".." />
            </div>
            <div className="flex flex-col  flex-grow-0">
                <div className="bg"></div>
                <p className=" font-medium">{comment.user.username}</p>
                <p className="text-sm">{comment.text}</p>
                <div className="mt-1 flex space-x-4">
                    <button className="like-btn text-xs font-medium text-gray-500 hover:text-gray-600" onClick={() => console.log('like comment')}>
                        <span>Like</span>
                        {comment.likes_count > 0 && <span className="text-xs">({comment.likes_count})</span>}
                    </button>
                    <button className="reply-btn text-xs font-medium text-gray-500 hover:text-gray-600" onClick={() => console.log('reply comment')}>
                        <span>Reply</span>
                        {comment.replies_count > 0 && <span className="text-xs">({comment.replies_count})</span>}
                    </button>
                    {comment.user.id === profileData.id &&
                        <button className="delete-btn text-xs font-medium text-gray-500 hover:text-gray-600" onClick={() => console.log('delete comment')}><span>Delete</span></button>
                    }
                </div>
                {
                    // <CommentInput />
                }
            </div>
        </div>
    )
}


