import React from 'react'
import Sidebar from '../Components/common/Sidebar';

export default function Layout({ children }) {
    const [firstChild, secondChild] = React.Children.toArray(children);


    return (

        <div className="main-layout-content grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
            <aside className=" layout-sidebar md:col-span-1 lg:col-span-3 hidden md:block ">
                <div
                    className="fixed md:w-[33%]  lg:w-[25%]"
                >
                    <Sidebar />
                </div>

            </aside>
            <main className="md:col-span-2 lg:col-span-6 lg:mx-4 xl:mx-auto xl:w-[38rem] ">
                {firstChild}
            </main>
            <aside className="hidden lg:block lg:col-span-3">
                {secondChild}
            </aside>
        </div>

    )
}
