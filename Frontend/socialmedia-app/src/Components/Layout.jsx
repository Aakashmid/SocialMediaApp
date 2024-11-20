import React from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [firstChild, secondChild] = React.Children.toArray(children);
    return (
        <>
            <header>
                <Topbar />
            </header>
            <div className="home-page-container lg:flex  ">
                <div className="hidden lg:block ">
                    <Sidebar />
                </div>
                <div className="md:w-[650px] mx-auto lg:flex-[4] lg:ml-[25%] lg:px-12 ">
                    {firstChild}
                </div>
                <div className="hidden lg:block lg:flex-[2] xl:flex-[2.5]">
                    {secondChild}
                </div>
            </div>

        </>
    )
}
