import React from 'react';
import Logo from '../Components/Logo';

const ServerErrorPage = () => {
    return <>
        <div className='flex  h-screen flex-col justify-center items-center px-10'>
            <div className="app-logo w-full text-center  my-[2rem]"><Logo fontSize='text-4xl' /></div>
            <h1 className='text-[2rem] lg:text-[3rem] text-center'>500 - Server Error</h1>
            <p className='text-xl text-center'>Sorry, something went wrong on our end. Please try again later.</p>
        </div>
    </>

};

export default ServerErrorPage;