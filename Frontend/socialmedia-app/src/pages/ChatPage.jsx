import React from 'react'
import Layout from '../Layout/Layout'

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = React.useState(null);
    return (

        <Layout>
            <div className="chat-wrapper  ">

                {!selectedUser ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-xl text-gray-600 font-medium mb-2">Select a user to start messaging</p>
                            <p className="text-sm text-gray-400">Choose from your connections to begin a conversation</p>
                        </div>
                    </div>
                ) : (
                    <div className="chat-content">
                        {/* Chat content will go here when user is selected */}
                    </div>
                )}
            </div>
            <div ></div>
        </Layout>
    )
}
