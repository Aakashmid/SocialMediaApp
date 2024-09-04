import React, { useContext, useEffect } from 'react'
import Posts from '../Posts'
import { Link, useLocation } from 'react-router-dom'
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import Rightbar from '../Rightbar';
import { ProfileContext } from '../context';
import { ArrowBack } from '@mui/icons-material';

export default function ProfilePostsPage() {
    const location = useLocation();
    const profile = useContext(ProfileContext);
    const { posts, postid, profileId } = location.state || [];  //here profileId  of post creator
    useEffect(() => {
        if (postid) {
            const element = document.getElementById(postid);
            if (element) {
                element.scrollIntoView({ block: "center" });
            }
        }
    }, [postid]);
    return (
        <>
            <Topbar />
            <div className="page-wrapper lg:flex">
                <div className="sidebar lg:block hidden">
                    <Sidebar />
                </div>
                <div className="profile-posts-wrapper md:w-[650px] mx-auto lg:flex-[5] lg:ml-[25%]  p-5">
                    <div className="page-top">
                        <div className="flex items-center space-x-6">
                            <Link to={`/profile/${profileId}`} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                            <h2 className='text-lg xl:text-xl font-medium'>{profile.id === profileId ? 'My posts' : profile.username + '\'s posts'}</h2>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Posts posts={posts} />
                    </div>
                </div>
                <div className="lg:flex-[2] xl:flex-[2.5]"></div>
            </div>
        </>
    )
}
