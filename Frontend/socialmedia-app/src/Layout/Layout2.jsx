import React from 'react'
import Topbar from '../Components/common/Topbar'
import Sidebar from '../Components/common/Sidebar'


export default function Layout2({ children }) {
    return (
        <>
            <div className="main-layout-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 ">
                <aside className="layout-sidebar md:col-span-1 lg:col-span-3 hidden md:block">
                    <div className=" fixed md:w-[33%] lg:w-[25%] ">
                        <Sidebar />
                    </div>
                </aside>
                <main className="md:col-span-2 lg:col-span-9   ">
                    {children}
                </main>
            </div>

        </>
    )
}
