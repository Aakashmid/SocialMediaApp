import { SearchRounded } from '@mui/icons-material'
import React from 'react'

export default function SearchInputForm1({ onFormSubmit }) {
    return (
        <div className="searchBar bg-white  rounded-[30px]   flex items-center w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
            {/* search bar form */}
            <form onSubmit={onFormSubmit} className="w-full flex items-center">
                <input type="text" name="query" className="search-query bg-transparent focus:outline-none px-4 text-sm py-[6px] flex-grow " placeholder="Search post or friend  " />
                <span className="py-1  cursor-pointer px-2 rounded-r-[30px] bg-gray-50">
                    <SearchRounded className="hover:text-blue-800" />
                </span>
            </form>
        </div>
    )
}
