import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'


export const PageTopBackArrow = ({ pageHeading, backTo }) => {
    return (<>
        <div className="page-top mb-5">
            <div className="flex items-center space-x-4">
                {/* <Link to={`/profile/${id}`} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link> */}
                <Link to={backTo} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                <h2 className='text-lg xl:text-xl font-medium'>{pageHeading}</h2>
            </div>
        </div>
    </>
    )
}

export const ButtonPrimary = ({ onclick, text }) => {
    return <div>
        <button type='button' onClick={onclick} className='bg-blue-600 text-white rounded-md  px-3 py-1'>{text}</button>
    </div>
}

export const BackToHome = ({ goTo, text }) => {
    return <Link to={goTo} className="inline-flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 rounded">
        <ArrowBack /> {text}
    </Link>
}
