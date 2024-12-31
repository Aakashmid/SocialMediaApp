import { ArrowBack } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

export default function SearchInputForm2({ close, onSearchFormSubmit }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleSearch = (e) => {
    // e.preventDefault();
    onSearchFormSubmit(e);
    console.log("search form submitted");
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`
        bg-white py-3 px-1 flex items-center border-b border-bg1
        transform transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <span className="p-[6px] hover:bg-gray-200 rounded-[50%]" onClick={() => close()} >
        <ArrowBack />
      </span>
      {/* search bar form */}
      <form onSubmit={handleSearch} className="w-full flex items-center">
        <input
          type="text"
          name="query"
          className="w-full search-query bg-transparent focus:outline-none px-4 py-[6px] flex-grow"
          placeholder="Search post or friend"
        />
      </form>
    </div>
  )
}