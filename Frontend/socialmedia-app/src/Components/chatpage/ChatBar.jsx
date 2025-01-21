import React, { useEffect, useRef, useState } from 'react'
import { MoreHoriz, MoreVert, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { fetchFriends } from '../../services/apiService';

export default function ChatBar({ selectedUser, friends, setFriends }) {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const navigate = useNavigate();
    const handleClickUser = (user) => {
        navigate(`/chat/${user.username.toLowerCase().replace(/\s+/g, '-')}`, { state: { user } });
    }

    const getFriends = async () => {
        try {
            setLoading(true);
            const data = await fetchFriends();
            setFriends(data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (friends.length === 0) {
            getFriends();
        }
    }, [])


    const ChatUserCard = ({ user }) => {
        return (
            <div onClick={() => handleClickUser(user)} className={`${selectedUser === user && 'bg-gray-100'} user-card flex items-center justify-between p-2 hover:bg-gray-100  cursor-pointer rounded-lg`}>
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



    const handleSearchUsers = (text) => {
        const filteredUsers = friends.filter((user) =>
            user.username.toLowerCase().includes(text.toLowerCase())
        );
        setSearchedUsers(filteredUsers);
    };

    const handleSearchTermChange = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        handleSearchUsers(value);
    };

    return (
        <div className="chatbar-container h-[calc(100vh-3.2rem)]  py-3  border-r-2">
            <div className="header-content flex items-center justify-between py-2 px-4">
                <h1 className="text-xl font-bold">Chats</h1>
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

            <div className="py-1 px-4 search-bar ">
                {/* search input */}
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline outline-1 outline-gray-500  focus:outline-blue-500  focus:outline-2  focus:bg-white transition-colors duration-200"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-600">
                        <Search />
                    </div>
                </div>
            </div>
            <hr className='mt-2' />
            {(searchTerm.trim() === '' ? friends : searchedUsers).length > 0 &&
                <div className="friends-list-wrapper pb-6 h-[calc(100%-70px)] overflow-y-scroll custom-scrollbar bg-white">
                    {(searchTerm.trim() === '' ? friends : searchedUsers).map((users, index) => (
                        <ChatUserCard key={index} user={users} />
                    ))}
                </div>
            }
            {(searchTerm.trim() === '' ? friends : searchedUsers).length === 0 &&
                <div className="p-4">
                    <p className='text-gray-700'>
                        {searchTerm.trim() === '' ? 'No friends found. Add friends to start chatting!' : 'No matching users found.'}
                    </p>
                </div>
            }
        </div>
    )
}