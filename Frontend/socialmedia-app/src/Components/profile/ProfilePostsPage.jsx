import React, { useContext, useEffect, useState } from 'react'
import PostList from '../post/PostList';
import { Link, useLocation } from 'react-router-dom'

import { ArrowBack } from '@mui/icons-material';
import Layout from '../../Layout/Layout';
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import { PostProvider } from '../../Contexts/PostContext';

export default function ProfilePostsPage() {
    const location = useLocation();
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    const { posts: initialPosts, postid, profileId } = location.state || [];  //here profileId is  of post creator
    const [posts, setPosts] = useState(initialPosts);



    useEffect(() => {
        if (postid) {
            const element = document.getElementById(postid);
            if (element) {
                element.scrollIntoView({ block: "center" });
            }
        }
    }, [postid]);


    const isFromSaved = location.pathname.includes('/saved-posts/');
    const pageTitle = isFromSaved ? "Saved Posts" : "Posts";

    return (
        <>
            <Layout>
                <div className="profile-posts-wrapper  p-5">
                    <div className="page-top">
                        <div className="flex items-center space-x-6">
                            <Link to={-1} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                            <h2 className='text-lg xl:text-xl font-medium'>{profileData.id === profileId ? `My ${pageTitle}` : profileData.username + `\'s ${pageTitle}`}</h2>
                        </div>
                    </div>
                    <div className="mt-5">
                        <PostProvider value={{ posts, setPosts }}>
                            <PostList />
                        </PostProvider>
                    </div>
                </div>
            </Layout>
        </>
    )
}
