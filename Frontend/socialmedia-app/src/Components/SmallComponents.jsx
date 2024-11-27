import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'


export const PageTopBackArrow = ({pageHeading,id}) => {
    return( <>
        <div className="page-top mb-5">
            <div className="flex items-center space-x-4">
                <Link to={`/profile/${id}`} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                <h2 className='text-lg xl:text-xl font-medium'>{pageHeading}</h2>
            </div>
        </div>
    </>
    )
}