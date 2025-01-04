import React from 'react'
import Topbar from '../Components/common/Topbar'
import Sidebar from '../Components/common/Sidebar';

export default function Layout({ children }) {
    const [firstChild, secondChild] = React.Children.toArray(children);
    return (
        <>
            <header>
                <Topbar />
            </header>
            <div className="home-page-container lg:flex">
                <div className="hidden lg:block lg:fixed lg:w-[25%]">
                    <Sidebar />
                </div>
                {/* <div className="md:w-[650px] mx-auto lg:w-[45%] lg:ml-[25%] lg:px-12">
                    {firstChild}
                </div> */}
                <div className="md:w-[650px] mx-auto lg:w-[45%] lg:px-12">
                    {firstChild}
                </div>
                <div className="hidden lg:block lg:w-[25%] lg:fixed lg:right-0">
                    {secondChild}
                </div>
            </div>
        </>
    )
}
