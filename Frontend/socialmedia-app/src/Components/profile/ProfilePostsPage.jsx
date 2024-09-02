import React from 'react'
import Posts from '../Posts'
import { useLocation } from 'react-router-dom'
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';

export default function ProfilePostsPage() {
    const location = useLocation();
    const { posts } = location.state || [];
    return (
        <>
            <Topbar />
            <div className="container">
                {/* <Sidebar /> */}
                <div className="profie-posts-page-wrapper absolute lg:ml-[25%]">
                    <div className='topbar flex items-center'>
                        <span className=''></span>
                        <h2 className=""></h2>
                    </div>
                    <Posts posts={posts} />
                </div>
            </div>
        </>
    )
}
