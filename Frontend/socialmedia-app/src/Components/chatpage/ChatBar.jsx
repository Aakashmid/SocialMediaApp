import React from 'react'
import { SearchInput } from '../common/SmallComponents'
import { MoreHoriz, MoreVert } from '@mui/icons-material'

export default function ChatBar() {
    return (
        <div className="chatbar-container h-[100vh] py-3 px-2 border-r-2">
            <div className="header-content flex items-center justify-between p-2">
                <h1 className="text-xl font-bold">Chats</h1>
                <div className="flex items-center space-x-2">
                    <span className='py-[2px] px-1 bg-gray-200 rounded-[50%]'><MoreHoriz fontSize='small' /></span>
                </div>
            </div>
            <div className="p-1"><SearchInput /></div>
            <div className="user-list-wrapper py-3  max-h-[100vh] overflow-y-scroll custom-scrollbar bg-white">
                <p className="">Here show friends</p>

            </div>
        </div>
    )
}
