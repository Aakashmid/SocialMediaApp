import React, { useEffect, useState } from 'react'

import ChatBar from '../Components/chatpage/ChatBar';
import { ArrowBack, Phone, VideoCall } from '@mui/icons-material';
import MessageInput from '../Components/chatpage/MessageInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split('/');
        const user = location.state?.user || null;
        if (path[2] && user) {
            setSelectedUser(user);
        }
        else {
            setSelectedUser(null);
        }
    }, [location]);

    const go_to_profile = (user) => {
        navigate(`/profile/${user.username}`, { state: { userId: user.id } });
    }
    const ChatContent = ({ user }) => {
        const [messages, setMessages] = useState([]);
        return (
            <div className="chat-wrapper  h-[calc(100vh-3.2rem)]">
                {!user ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">Please select a user to start chatting</p>
                    </div>
                ) : (
                    <div className='h-full w-full'>
                        <div className="chat-top  user-info flex items-center gap-2 pl-1 pr-2 md:px-3 py-2 w-full bg-gray-200 shadow-sm">
                            <Link to={'/chat'} className='p-1 hover:bg-gray-100 rounded-full md:hidden'>
                                <ArrowBack />
                            </Link>
                            <div onClick={() => go_to_profile(user)} className='flex items-center gap-3 cursor-pointer'>
                                <div>
                                    <img
                                        src={user.profilePicture || "/images/default-avatar.png"}
                                        alt="profile image"
                                        className='w-10 h-10 object-cover rounded-[50%]'
                                    />
                                </div>
                                <div className="user-details flex flex-col items-start">
                                    <h3 className="font-medium text-gray-800">{user.username}</h3>
                                    <span className="text-xs  text-gray-500">
                                        {user.isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-auto flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full call">
                                    <Phone />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <VideoCall />
                                </button>
                            </div>
                        </div>

                        <div className="chat-content   h-[calc(100vh-7rem)] overflow-y-auto rounded-xl relative">
                            {messages.length === 0 &&
                                <div className="flex flex-col items-center justify-center h-full">

                                    <p className="text-gray-500 mt-4">No messages yet</p>
                                    <p className="text-gray-400 text-sm">Send a message to start the conversation</p>
                                </div>

                            }

                            <div className="absolute bottom-0 w-full ">
                                <MessageInput />
                            </div>
                        </div>

                    </div>
                )}
            </div>
        )
    }
    return (
        <>
            <div className="main-layout ">
                <div className="chat-page-container  ">
                    {/* for small scrern */}
                    <div className="md:hidden block">
                        {!selectedUser ?
                            <ChatBar friends={friends} setFriends={setFriends} selectedUser={selectedUser} />
                            : <ChatContent user={selectedUser} />
                        }
                    </div>

                    {/* for larger screen */}
                    <div className="hidden   md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 md:gap-5">
                        <aside className=" layout-sidebar md:col-span-1 lg:col-span-3 hidden md:block ">
                            <div
                                className="fixed md:w-[33%]  lg:w-[25%]"
                            >
                                <ChatBar friends={friends} setFriends={setFriends} selectedUser={selectedUser} />
                            </div>

                        </aside>
                        <main className="md:col-span-2 lg:col-span-6  ">
                            <ChatContent user={selectedUser} />
                        </main>
                        <aside className="hidden lg:block lg:col-span-3">
                            {/* {secondChild} */}
                        </aside>
                    </div>

                </div>
            </div>


        </>
    )
}