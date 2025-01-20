import React, { useContext, useEffect, useState } from 'react'
import PostList from '../post/PostList';
import { Link, useLocation, useNavigate } from 'react-router-dom'


import Layout from '../../Layout/Layout';
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import { PostContext, PostProvider } from '../../Contexts/PostContext';
import { fetchSavedPosts } from '../../services/apiService';
import { PageTopBackArrow } from '../common/SmallComponents';
import { Settings } from '@mui/icons-material';
import useToggle from '../../hooks/useToggle';
import ManagePostsMdl from '../post/ManagePostsMdl';

export default function ProfilePostsPage() {
    const location = useLocation();
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    const { postid, profileId, isSavedPosts } = location.state || {};  //here profileId is  of post creator    
    const { posts, setPosts } = useContext(PostContext);
    const [isMngPstMdlOpen, toggleMngPstMdl] = useToggle(false);
    const [isFilterMdl, toggleFilterMdl] = useToggle(false);

    const { filteredPosts, setFilteredPosts } = useState(posts);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Store posts in localStorage when they change
        if (posts.length > 0) {
            localStorage.setItem('cachedPosts', JSON.stringify(posts))
        }
    }, [posts])

    useEffect(() => {
        // Load posts from localStorage on initial render
        const cachedPosts = localStorage.getItem('cachedPosts')
        if (cachedPosts) {
            setPosts(JSON.parse(cachedPosts))
        }

        console.log(isSavedPosts)
        if (postid) {
            const element = document.getElementById(postid)
            if (element) {
                element.scrollIntoView({ block: "center" })
            }
        }
    }, [postid])


    const handleFilterPosts = () => {
        if (isSavedPosts) {
            setFilteredPosts(posts.filter(post => post.isSaved))
        } else {
            setFilteredPosts(posts)
        }
    }

    // Fetch saved posts if isSavedPosts is true
    useEffect(() => {
        const fetchPosts = async () => {
            if (isSavedPosts) {
                try {
                    setIsLoading(true);
                    const savedPosts = await fetchSavedPosts();
                    setPosts(savedPosts);
                } catch (error) {
                    console.error('Error fetching saved posts:', error)
                }
                finally {
                    setIsLoading(false)
                }
            }
        }

        fetchPosts()
    }, [isSavedPosts])
    return (
        <>
            <Layout>
                <div className="profile-posts-wrapper p-5">
                    <div className="page-top flex justify-between items-center ">
                        {isSavedPosts ?
                            <>
                                <PageTopBackArrow backTo={-1} pageHeading={'Saved Posts'} />
                                <div className="posts-actions flex items-center   gap-2 lg:gap-4">
                                    <button className='filter posts py-1 px-4 rounded-xl bg-gray-200 hover:bg-gray-100'>
                                        Filter
                                    </button>
                                </div>
                            </>

                            :
                            <>
                                <PageTopBackArrow backTo={-1} pageHeading={profileData.id === profileId ? `Your Posts` : profileData.username + `\'s Posts`} />
                                {profileData.id === profileId && (
                                    <div className="posts-actions flex items-center   gap-2 lg:gap-4">
                                        <button className='filter posts py-1 px-4 rounded-xl bg-gray-200 hover:bg-gray-100'>
                                            Filter
                                        </button>
                                        <button onClick={toggleMngPstMdl} className='manage posts py-1 px-4 rounded-xl bg-gray-200 gap-1 items-center flex hover:bg-gray-100'><Settings fontSize='small' /> Manage Posts</button>
                                    </div>
                                )}
                            </>
                        }
                    </div>
                    {isLoading ? <div className='text-center'>Loading ....</div> :
                        posts.length === 0 ?
                            <div className='flex flex-col items-center justify-center min-h-[200px] text-gray-500'>
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                <p className="text-xl font-semibold">No Saved Posts Yet</p>
                                <p className="text-sm mt-2">Start saving posts to see them here</p>
                            </div> :
                            <div className="post-list">
                                <PostProvider value={{ posts, setPosts }}>
                                    <PostList />
                                </PostProvider>
                            </div>
                    }
                    {isMngPstMdlOpen &&
                        (
                            <>
                                <div className="bg-white top-0 left-0 w-full h-full  z-[60]">
                                    hello
                                    <ManagePostsMdl />
                                </div>
                                <span className='fixed top-0 left-0 w-full h-full bg-gray-700/20 z-50' onClick={toggleMngPstMdl}></span>
                            </>


                        )
                    }
                </div>
            </Layout>
        </>
    )
}
