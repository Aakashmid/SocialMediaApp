import { ArrowBack, Search } from '@mui/icons-material'
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

// export const SearchInput = ({ onSearch }) => {
export const SearchInput = () => {
    // here onSearch is a function that will be called when the user types in the search input.
    return (
        <div className="relative w-full ">
            <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 text-gray-700 bg-gray-100  border border-gray-300 rounded-lg outline-none focus:outline-2 focus:outline focus:outline-blue-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-600">
                <Search />
            </div>
        </div>)
}