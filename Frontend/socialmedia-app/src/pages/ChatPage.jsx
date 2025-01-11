import React from 'react'
import Layout from '../Layout/Layout'
import ChatBar from '../Components/chatpage/ChatBar';

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = React.useState(null);
    return (

        // <Layout>
        <div className="main-layout-content grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 md:gap-5">
            <div className="chat-wrapper  ">

                {!selectedUser &&
                    <div className="fixed w-full">
                        <ChatBar setSelectedUser={setSelectedUser} />
                    </div>
                }
            </div>
        </div>
        // </Layout>
    )
}
