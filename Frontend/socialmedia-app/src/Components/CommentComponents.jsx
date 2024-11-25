import { Send } from '@mui/icons-material';
import React, { useState } from 'react'


// todo of this function - give option to like comment, reply , and remove comment option for commented user 
export const CommentUserCard = ({ comment }) => {
    return (
        <div className='flex space-x-4'>
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.location.href = `/profile/${user.id}`}>
                <img src={comment.user.profileImg} className='w-7 h-7 object-cover rounded-xl' alt=".." />
            </div>
            <div className="flex flex-col  flex-grow-0">
                <p className=" font-medium">{comment.user.username}</p>
                <p className="text-sm ">{comment.text}</p>
                <div className="mt-2 "></div>
            </div>
        </div>
    )
}


export const CommentInput = ({ user ,onComment}) => {
    const [commentText, setCommentText]= useState("");
    const handleCommentTextChange= (e)=>{
        setCommentText(e.target.value);
        // console.log(commentText);
    }

    // handle it for replay also 
    const handleSubmit = ()=>{
        console.log('handleSubmit');
        if(commentText != "" ){
            var data = new FormData(); 
            data.append('text',commentText);
            // data.append('text',commentText);
            onComment(data);
            setCommentText("");
        }
        // else{
        //     console.log()
        // }
    }
    return <>
        <div className="py-2 px-3 flex items-center space-x-3">
            <div className="current-user-img">
                <img src={user.profileImg} className="user-profileImg w-8 h-8 border rounded-[50%] object-cover" alt=".." />
            </div>
            <div className="bg-gray-200 commment-input-form flex-grow flex items-center rounded-lg overflow-hidden ">
                <input onKeyUp={(e)=>{if (e.key === "Enter") {handleSubmit()}}} type="text"  className='bg-gray-200 w-full p-2 outline-none' onChange={handleCommentTextChange} value={commentText}/>
                <button onClick={()=>handleSubmit()} type='submit' className='sent-btn p-1 '><span className=""><Send className={`${commentText !=="" ? 'text-bgPrimary':'text-gray-500'}`}/></span></button>
            </div>
        </div>
    </>
}
