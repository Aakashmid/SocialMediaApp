import React from 'react'

export default function Btn1({ handleClick, text, Icon }) {
    return (
        <button onClick={handleClick} className=' manage posts py-1 px-3 rounded-xl bg-gray-200 gap-2 items-center flex hover:bg-gray-100'>{Icon} <span className='text-sm  md:text-[1rem]'>{text}</span></button>
    )
}
