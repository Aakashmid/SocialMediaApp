import { useNavigate } from "react-router-dom";
import { CommentsContext } from "../../Contexts/CommentContext";
import { useContext, useState } from "react";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import { createComment, createReply } from "../../services/apiService";
import { Send } from "@mui/icons-material";

const CommentInputForm = ({ post, replyProps = {} }) => {  // here some props are for replies and some for comments
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
            <div className="current-user-img" onClick={() => navigate(`/profile/${user.username}`)}>
                <img src={user.profileImg} className={`${isReply ? 'user-profileImg w-7 h-7 border rounded-[50%] object-cover' : "user-profileImg w-9 h-9 border rounded-[50%] object-cover"}`} alt=".." />

            </div>
            <form onSubmit={handleSubmit} className="text-input-form bg-gray-200 input-form flex-grow flex items-center rounded-lg overflow-hidden">
                <input type="text" className={`${isReply ? 'bg-gray-200 w-full px-2 text-sm font-normal py-[3px] outline-none' : 'bg-gray-200 w-full p-2 outline-none'}`} onChange={handleInputTextChange} value={inputText} />
                <button type='submit' className='sent-btn p-1 '><span className=""><Send fontSize={`${isReply ? 'small' : 'medium'}`} className={`${inputText !== "" ? 'text-bgPrimary' : 'text-gray-500'}`} /></span></button>
            </form>
        </div>
    </>
}

export default CommentInputForm;