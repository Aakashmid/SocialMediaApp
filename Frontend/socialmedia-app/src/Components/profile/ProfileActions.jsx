import React from 'react'
import { Link } from 'react-router-dom'
import SharePost from '../post/SharePost'
import { Close } from '@mui/icons-material'
export default function ProfileActions({ showShare, setShowShare, profileData, handleCreatePost }) {
    return (
        <div className='px-4 mx-auto lg:w-2/3  '>
            <div className="grid grid-cols-2 gap-5 py-2 mb-4">
                {/* profile buttons  */}
                <Link className='block  hover:bg-gray-900  py-1 bg-gray-700 rounded-lg text-white text-center' to={`/profile/${profileData.username}/edit`}>Edit Profile</Link>
                {!showShare && <button onClick={() => setShowShare(!showShare)} className='cursor-pointer hover:bg-gray-900  py-1 bg-gray-700 rounded-lg text-white '>New Post</button>}
            </div>
            {showShare &&
                <div className="relative py-4 lg:py-8">
                    <span onClick={() => setShowShare(!showShare)} className='-right-2 absolute top-0 lg:top-4 bg-gray-100 p-1 hover:bg-gray-200 rounded-lg cursor-pointer'><Close fontSize='small' /></span>
                    <SharePost onShare={handleCreatePost} />
                </div>}
        </div>
    )
}
