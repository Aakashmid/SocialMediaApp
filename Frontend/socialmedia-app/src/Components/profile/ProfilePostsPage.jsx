import React, { useContext, useEffect } from 'react'
import Posts from '../Posts'
import { Link, useLocation } from 'react-router-dom'
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import Rightbar from '../Rightbar';
import { ProfileContext } from '../context';
import { ArrowBack } from '@mui/icons-material';
import Layout from '../Layout';

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
            <Layout>
                <div className="profile-posts-wrapper  p-5">
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
            </Layout>
        </>
    )
}
