import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Topbar from '../Components/common/Topbar'
import SharePost from '../Components/post/SharePost'
import { ProfileDataContext } from '../Contexts/ProfileContext'
import api from '../Api'
import Sidebar from '../Components/common/Sidebar'
import { Close } from '@mui/icons-material'
import { CreatePost, fetchSavedPosts, fetchUserPosts, followUser, unfollowUser } from '../services/apiService'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileStats from '../components/profile/ProfileStats'
import ProfileFeed from '../components/profile/ProfileFeed'
import ProfileActions from '../Components/profile/ProfileActions'
import useProfileData from '../hooks/useProfileData'

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const { profileData, setProfileData } = useContext(ProfileDataContext)   // profile data is current user profile data , fetching it from profileContext
    const [showShare, setShowShare] = useState(false);
    const [feedOP, setfeedOp] = useState('posts')  // initialize profile feed options , defaul posts
    const [profilePosts, setProfilePosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    const { id: profileUserId } = useParams(); // users's profile id w
    const navigate = useNavigate()

    //  using custom hook to get profile data for profilepage
    const { profile, setProfile, isCUProfile } = useProfileData(profileUserId, profileData);



    const getProfilePosts = async () => {
        if (profilePosts.length === 0) {
            setLoading(true);
            try {
                const data = await fetchUserPosts(profileUserId);
                setProfilePosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
            finally {
                setLoading(false);
            }
        }
    }

    const getSavedPosts = async () => {
        if (savedPosts.length === 0) {
            setLoading(true);
            try {
                const data = await fetchSavedPosts();
                setSavedPosts(data);
            } catch (error) {
                console.error('Error fetching saved posts:', error);
            }
            finally {
                setLoading(false);
            }
        }
    }

    const handleCreatePost = async (post_data) => {
        try {
            const newPost = await CreatePost(post_data);
            setProfileData({ ...profileData, posts_count: profileData.posts_count + 1 })
            setProfilePosts((prevPosts) => [...prevPosts, newPost]);
        } catch (error) {
            console.error(error);
        }
    }


    // Fetch posts or saved posts when feedOP changes 
    useEffect(() => {
        if (feedOP === 'posts') {
            getProfilePosts();
        }
        else if (feedOP === 'saved') {
            getSavedPosts();
        }
    }, [feedOP, profileUserId]);


    const handleOnclickPost = (id) => {
        const posts = feedOP === 'posts' ? profilePosts : savedPosts;
        const postUrl = feedOP === 'saved' ? `saved-posts/${id}` : `posts/${id}`;

        navigate(postUrl, {
            state: {
                posts: posts,
                postid: "post" + id,
                profileId: profile.id
            }
        });
    };
    // handle follow a user   // have to work on it 
    const handleFollow = async (userId) => {
        if (profile.isFollowed) {
            const response = await unfollowUser(userId);
            setProfile({ ...profile, followers_count: profile.followers_count - 1, isFollowed: false })
            if (profile.id != profileData.id) {
                setProfileData({ ...profileData, followings_count: profileData.followings_count - 1 })
            }
            // console.log(response)
        } else {
            const response = await followUser(userId);
            setProfile({ ...profile, followers_count: profile.followers_count + 1, isFollowed: true })
            if (profile.id != profileData.id) {
                setProfileData({ ...profileData, followings_count: profileData.followings_count + 1 })
            }
            // console.log(response)
        }
    }


    return (
        <>
            <Topbar />
            <div className="profile-page-contanier lg:flex ">
                <div className="hidden lg:block ">
                    <Sidebar />
                </div>
                <div className="profile-wrapper w-full md:w-[650px] md:mx-auto md:shadow-lg min-h-[100vh] flex-[5] lg:ml-[25%]">
                    <div className="profile-top">
                        <div className="profileCover relative">
                            <img src="/src/assets/post/3.jpeg" className='cover-img w-full h-36 object-cover' alt="..." />
                            <img src={profile.profileImg} className='profile-img w-28 h-28 rounded-[50%] absolute left-1/2 top-20 object-cover -translate-x-1/2 border-4 border-white' alt="" />
                            <div className="w-full h-16"></div>
                        </div>
                        <ProfileHeader profile={profile} isCUProfile={isCUProfile} handleFollow={handleFollow} />
                        <ProfileStats profile={profile} />

                        {isCUProfile &&
                            <ProfileActions showShare={showShare} setShowShare={setShowShare} handleCreatePost={handleCreatePost} profileData={profileData} />
                        }
                    </div>
                    <ProfileFeed setFeedOp={setfeedOp} feedOP={feedOP} profilePosts={profilePosts} savedPosts={savedPosts} loading={loading} handleOnclickPost={handleOnclickPost} />

                </div>
            </div>
        </>
    )
}

export default Profile;