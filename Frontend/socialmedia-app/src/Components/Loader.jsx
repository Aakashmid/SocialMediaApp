import { CircularProgress } from '@mui/material'
import React from 'react'

export const  CircleLoader = () => {
    return (
        <div className='flex py-4  w-full justify-center  fixed top-20 left-0   z-50 items-center  '>
            <CircularProgress className='w-44' />
        </div>
    )
}

export const  HomePageLoader = () => {
    return (
        <div className='flex py-4  w-full justify-center  fixed top-20 left-0   z-50 items-center  '>
            <CircularProgress className='w-44' />
        </div>
    )
}


