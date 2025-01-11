import React from 'react'
import Topbar from '../Components/common/Topbar'
import Sidebar from '../Components/common/Sidebar'


export default function Layout2({ children }) {
    return (
        <>
            <div className='main-layout-container'>
                {/* <header>
                    <Topbar />
                </header> */}
                <div className="main-layout-content grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
                    <aside className="layout-sidebar md:col-span-1 lg:col-span-4 hidden md:block">
                        <div className=" fixed md:w-[25%] w-full">
                            <Sidebar />
                        </div>
                    </aside>
                    <main className="md:col-span-2 lg:col-span-8   ">
                        {children}
                    </main>
                </div>
            </div>
            {/* <div className='main-layout-container'>
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
            </div> */}
        </>
    )
}
