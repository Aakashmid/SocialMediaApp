import { ArrowBack, Search } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'


export const PageTopBackArrow = ({ pageHeading, backTo }) => {
    return (<>
        <div className="back-arrow flex items-center gap-4  bg-white ">
            <Link to={backTo} className='p-2 hover:bg-gray-100 text-gray-600 rounded-full transition-colors duration-200'>
                <ArrowBack
                />
            </Link>
            <h2 className='text-xl lg:text-2xl  font-semibold text-gray-800'>{pageHeading}</h2>
            <hr className="bg-gray-800 h-[2px] my-2" />
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
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline outline-1 outline-gray-500  focus:outline-blue-500  focus:outline-2  focus:bg-white transition-colors duration-200" />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-600">
                <Search />
            </div>
        </div>)
}