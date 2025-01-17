import { SearchRounded } from '@mui/icons-material'
import React from 'react'

export default function SearchInputForm1({ onSearchFormSubmit }) {
    return (
        <div className="searchBar bg-white  rounded-[30px]   flex items-center w-[200px] md:w-[300px] lg:w-[400px] overflow-hidden xl:w-[500px]">
            {/* search bar form */}
            <form onSubmit={onSearchFormSubmit} className="w-full flex items-center">
                <input type="text" name="query" className="search-query bg-transparent focus:overflow-hidden focus:outline-none px-4  text-sm py-[6px] flex-grow " placeholder="Search post or friend  " />
                <button type='submit' className='py-1  cursor-pointer px-2 hover:bg-gray-100 bg-gray-50'>
                    <SearchRounded className="hover:text-blue-800" />
                </button>
            </form>
        </div>
    )
}
