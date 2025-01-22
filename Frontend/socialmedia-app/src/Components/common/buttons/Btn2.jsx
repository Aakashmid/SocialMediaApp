import React from 'react'

export default function Btn1({ handleClick, text, Icon }) {
    return (
        <button onClick={handleClick} className=' manage posts py-1 px-3 rounded bg-blue-500 transition-colors duration-200 gap-2 items-center flex hover:bg-blue-600'>{Icon} <span className='text-sm text-white md:text-[1rem]'>{text}</span></button>
    )
}
