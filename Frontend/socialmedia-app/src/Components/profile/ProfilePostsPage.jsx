import React, { useContext, useEffect, useState } from 'react'
import PostList from '../post/PostList';
import { Link, useLocation, useNavigate } from 'react-router-dom'


import Layout from '../../Layout/Layout';
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import { PostContext, PostProvider } from '../../Contexts/PostContext';
import { fetchSavedPosts, fetchUserPosts } from '../../services/apiService';
import { PageTopBackArrow } from '../common/SmallComponents';
import { Filter, FilterList, Settings } from '@mui/icons-material';
import useToggle from '../../hooks/useToggle';
import ManagePostsMdl from '../post/ManagePostsMdl';
import Btn1 from '../common/buttons/Btn1';

export default function ProfilePostsPage() {
    const location = useLocation();
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    const queryParams = new URLSearchParams(location.search);
    const postid = parseInt(queryParams.get('postid'));
    const profileId = parseInt(queryParams.get('profileId'));
    const isSavedPosts = location.pathname.includes('saved-posts') ? true : false;

    const { posts, setPosts } = useContext(PostContext);
    const [isMngPstMdlOpen, toggleMngPstMdl] = useToggle(false);
    const [isFilterMdl, toggleFilterMdl] = useToggle(false);

    const [filteredPosts, setFilteredPosts] = useState(posts);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            try {
                // Check if posts exist in localStorage and are not expired
                const cachedData = localStorage.getItem('profilePosts');
                const cachedTimestamp = localStorage.getItem('profilePostsTimestamp');
                const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

                if (cachedData && cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION)) {
                    console.log("Cached data is seted");
                    const parsedData = JSON.parse(cachedData);
                    setPosts(parsedData);
                    setFilteredPosts(parsedData);
                } else if (posts.length === 0) {
                    // If no cache or expired, fetch new data
                    if (isSavedPosts) {
                        const savedPostsData = await fetchSavedPosts();
                        setPosts(savedPostsData);
                        setFilteredPosts(savedPostsData);
                        // Store in localStorage with timestamp
                        localStorage.setItem('profilePosts', JSON.stringify(savedPostsData));
                        localStorage.setItem('profilePostsTimestamp', Date.now().toString());
                    }
                    else {
                        const userPostsData = await fetchUserPosts(profileId);
                        setPosts(userPostsData);
                        setFilteredPosts(userPostsData);
                        // Store in localStorage with timestamp
                        localStorage.setItem('profilePosts', JSON.stringify(userPostsData));
                        localStorage.setItem('profilePostsTimestamp', Date.now().toString());
                    }
                }
                else {
                    localStorage.setItem('profilePosts', JSON.stringify(posts));
                }
            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPosts();
    }, [isSavedPosts, setPosts, profileId]);


    // for scroll to post of postId
    useEffect(() => {
        if (postid) {
            const element = document.getElementById("post" + postid)
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
   
    return (
        <>
            <Layout>
                <div className="profile-posts-wrapper p-5">
                    <div className="page-top flex justify-between items-center relative mb-4">
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
                                <PageTopBackArrow backTo={-1} pageHeading={profileData.id == profileId ? `Posts` : profileData.username + `\'s Posts`} />
                                {profileData.id === profileId && (
                                    <>
                                        <div className="posts-actions flex items-center  gap-2 lg:gap-4">
                                            <Btn1 text={'Filters'} Icon={<FilterList fontSize='small' />} handleClick={toggleFilterMdl} />
                                            <Btn1 text='Manage Posts' handleClick={toggleMngPstMdl} Icon={<Settings fontSize='small' />} />
                                        </div>
                                        {/* filter and manage posts modals */}

                                        {isMngPstMdlOpen &&
                                            (
                                                <>
                                                    <div className="bottom-0 lg:top-1/2 left-1/2 lg:-translate-y-1/2 -translate-x-1/2  w-full  lg:w-[60vw] xl:w-[50vw] h-[90vh]  fixed z-[60] ">
                                                        <ManagePostsMdl posts={posts} setPosts={setPosts} toggleFilterMdl={toggleFilterMdl} toggle={toggleMngPstMdl} />
                                                    </div>
                                                    <span className='fixed top-0 left-0 w-full h-full bg-gray-700/20 z-50' onClick={toggleMngPstMdl}></span>
                                                </>
                                            )
                                        }

                                    </>
                                )}
                            </>
                        }
                    </div>

                    <div className="post-list">
                        <PostProvider value={{ posts, setPosts }}>
                            <PostList />
                        </PostProvider>
                    </div>


                </div>
            </Layout>
        </>
    )
}