import React, { useState } from 'react'
import { SearchInput } from '../common/SmallComponents'
import { MoreHoriz, MoreVert } from '@mui/icons-material'
import chatUsers from '../../dummyData/ChatUsers'

export default function ChatBar({ setSelectedUser }) {
    // const [users, setUsers] = useState([]);

    const UserCard = ({ user }) => {
        return (

            <div onClick={() => setSelectedUser(user)} className="user-card flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={user.profilePicture || "/images/default-avatar.png"} alt="profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="user-info">
                        <h3 className="font-semibold">{user.username}</h3>
                        <p className="text-sm text-gray-500">{user.lastMessage || "Start a conversation"}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end text-xs text-gray-500">
                    <span>{user.lastMessageTime}</span>
                    {user.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white rounded-full px-2 py-1 mt-1">
                            {user.unreadCount}
                        </span>
                    )}
                </div>
            </div>

        )
    }

    return (
        <div className="chatbar-container h-[calc(100vh-3.2rem)]  py-3 px-3 lg:px-4 border-r-2">
            <div className="header-content flex items-center justify-between p-2">
                <h1 className="text-xl font-bold">Chats</h1>

                {/* incomplete part option menu */}
                <div className="flex items-center space-x-2">
                    <span className='py-[2px] px-1 bg-gray-200 rounded-[50%] cursor-pointer'>
                        <MoreHoriz fontSize='small' />
                        <div className="hidden absolute bg-white shadow-lg rounded-lg mt-2">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100">New Chat</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Mark as Read</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Archive Chat</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Delete Chat</li>
                                <li className="px-4 py-2 hover:bg-gray-100">Block User</li>
                            </ul>
                        </div>
                    </span>
                </div>
            </div>
            <div className="p-1"><SearchInput /></div>
            <div className="user-list-wrapper py-3   h-[calc(100%-70px)] overflow-y-scroll custom-scrollbar bg-white">
                {chatUsers.map((users, index) => {
                    return (
                        <UserCard key={index} user={users} />
                    )
                })}

            </div>
        </div>
    )
}
