import React from 'react'
import Topbar from '../Components/common/Topbar'
import Sidebar from '../Components/common/Sidebar';
import ChatBar from '../Components/chatpage/ChatBar';

export default function Layout({ children }) {
    const [firstChild, secondChild] = React.Children.toArray(children);
    const SidebarContent = window.location.pathname.includes('chat') ? ChatBar : Sidebar;

    return (
        <div className='main-layout-container'>
            {/* <header>
                <Topbar />
            </header> */}
            {/* <div className="main-layout-content lg:flex">
                <aside className="layout-sidebar hidden lg:block lg:fixed ">
                    <SidebarContent />
                </aside>
                <main className="md:w-[650px] mx-auto lg:w-[45%] 2xl:px-12 xl:px-8 lg:px-4">
                    {firstChild}
                </main>
                <aside className="hidden lg:block lg:w-[25%] lg:fixed lg:right-0">
                    {secondChild}
                </aside>
            </div> */}
            <div className="main-layout-content grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
                <aside className="layout-sidebar md:col-span-1 lg:col-span-3 hidden md:block ">
                    <div className=" fixed md:w-[25%] w-full">
                        <SidebarContent />
                    </div>
                </aside>
                <main className="md:col-span-2 lg:col-span-6 lg:mx-4 xl:mx-auto xl:w-[38rem] ">
                    {firstChild}
                </main>
                <aside className="hidden lg:block lg:col-span-3">
                    {secondChild}
                </aside>
            </div>
        </div>
    )
}
