import { AttachFileSharp, SendOutlined, SendSharp, SentimentSatisfiedSharp } from '@mui/icons-material'
import React from 'react'

export default function MessageInput() {
    return (
        <div className="message-input-container  w-full bg-gray-800 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-200 rounded-full rotate-45">
                    <AttachFileSharp />
                </button>

                <input
                    type="text"
                    placeholder="Type your message here..."
                    className="w-full bg-gray-800 text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button className="p-2 text-gray-400 hover:text-gray-200 rounded-full">
                    <SentimentSatisfiedSharp />
                </button>

                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full send-button -rotate-90">
                    <SendSharp />
                </button>
            </div>
        </div>

    )
}
