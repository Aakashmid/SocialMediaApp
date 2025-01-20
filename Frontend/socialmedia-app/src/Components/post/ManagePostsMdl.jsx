import { Close } from '@mui/icons-material'
import React from 'react'

export default function ManagePostsMdl({ toggle }) {
    return (
        <div className='manage-posts-modal-container bg-gray-100'>
            <div className="grid grid-cols-3 gap-4 border-b">
                <div className=""></div>
                <h1 className="heading">Manage Posts</h1>
                <button className='close-btn' onClick={toggle}><Close /></button>
            </div>
        </div>
    )
}
