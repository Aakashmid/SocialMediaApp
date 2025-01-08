import React from 'react'
import Topbar from '../Components/common/Topbar'
import Sidebar from '../Components/common/Sidebar';
import ChatBar from '../Components/chatpage/ChatBar';

export default function Layout({ children }) {
    const [firstChild, secondChild] = React.Children.toArray(children);
    const SidebarContent = window.location.pathname.includes('chat') ? ChatBar : Sidebar;

    return (
        <div className='main-layout-container'>
            <header>
                <Topbar />
            </header>
            <div className="main-layout-content lg:flex">
                <aside className="layout-sidebar hidden lg:block lg:fixed ">
                    <SidebarContent />
                </aside>
                <main className="md:w-[650px] mx-auto lg:w-[45%] 2xl:px-12 xl:px-8 lg:px-4">
                    {firstChild}
                </main>
                <aside className="hidden lg:block lg:w-[25%] lg:fixed lg:right-0">
                    {secondChild}
                </aside>
            </div>
        </div>
    )
}
