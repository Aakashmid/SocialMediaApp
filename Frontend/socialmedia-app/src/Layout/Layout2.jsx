import React from 'react'
import Topbar from '../Components/common/Topbar'
import Sidebar from '../Components/common/Sidebar'


export default function Layout2({ children }) {
    return (
        <div className='main-layout-container'>
            <header>
                <Topbar />
            </header>
            <div className="main-layout-content lg:flex">
                <aside className="layout-sidebar hidden lg:block lg:fixed ">
                    <Sidebar />
                </aside>
                <main className="w-full md:w-[650px] md:mx-auto md:shadow-lg min-h-[100vh] lg:w-full lg:ml-[30%] xl:ml-[27%]">
                    {children}
                </main>
            </div>
        </div>
    )
}
