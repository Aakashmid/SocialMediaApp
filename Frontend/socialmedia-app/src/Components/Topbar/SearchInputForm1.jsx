import { SearchRounded } from '@mui/icons-material'
import React from 'react'

export default function SearchInputForm1({ onSearchFormSubmit }) {
    return (
        <div className="searchBar bg-white  rounded-[30px]   flex items-center w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
            {/* search bar form */}
            {/* <form onSubmit={handleSubmit} className="w-full flex items-center"> */}
            <form onSubmit={onSearchFormSubmit} className="w-full flex items-center">
                <input type="text" name="query" className="search-query bg-transparent focus:outline-none px-4 text-sm py-[6px] flex-grow " placeholder="Search post or friend  " />
                <button type='submit' className='py-1  cursor-pointer px-2 rounded-r-[30px] bg-gray-50'>

                    <SearchRounded className="hover:text-blue-800" />
                </button>
                {/* <span className="py-1  cursor-pointer px-2 rounded-r-[30px] bg-gray-50"> */}
                {/* </span> */}
            </form>
        </div>
    )
}
