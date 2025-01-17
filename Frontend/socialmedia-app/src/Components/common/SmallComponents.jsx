import { ArrowBack, Search } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'


export const PageTopBackArrow = ({ pageHeading, backTo }) => {
    return (<>
        <div className="back-arrow flex items-center gap-4   bg-white ">
            <Link to={backTo} className='p-2 hover:bg-gray-100 text-gray-600 rounded-full transition-colors duration-200'>
                <ArrowBack
                />
            </Link>
            <h2 className='text-xl lg:text-2xl  font-semibold text-gray-800'>{pageHeading}</h2>
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


