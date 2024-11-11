import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ExitToApp, PersonOutline } from '@mui/icons-material'
import { ProfileContext } from '../Context'

export default function ProfilePopover({ popover }) {
    const profile = useContext(ProfileContext)
    return (<>
        <div className="flex-col flex space-y-1 bg-white p-2 border-2 shadow rounded border-gray-200" >
            <Link onClick={() => popover.setShowProPopover(!popover.showProPopover)} to={`/profile/${profile.id}`} className="p-1 flex items-center space-x-2 hover:text-blue-500 active:text-blue-500"><PersonOutline /><span className="">Profile</span></Link>
            <hr />
            <Link to={'/logout'} className="p-1 flex items-center space-x-2 hover:text-red-500 active:text-red-500"><ExitToApp /><span className="">Logout</span></Link>
        </div>
    </>
    )
}
