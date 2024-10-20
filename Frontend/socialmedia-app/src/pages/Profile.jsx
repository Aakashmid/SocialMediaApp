import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Topbar from '../Components/Topbar'
import SharePost from '../Components/SharePost'
import { ProfileContext } from '../Components/Context'
import api from '../Api'
import Sidebar from '../Components/Sidebar'
import { Close } from '@mui/icons-material'
import Loader from '../Components/Loader'
import ProfilePosts from '../Components/profile/ProfilePosts'
import { followUser, unfollowUser } from '../Components/apiService'

const Profile = () => {

    const [profile, setProfile] = useState({});
    const [isCUProfile, setisCUProfile] = useState(false); // is currentuserprofie
    const [showShare, setShowShare] = useState(false);
    const [feedOP, setfeedOp] = useState('posts')  // initialize profile feed options , defaul posts
    const [profilePosts, setProfilePosts] = useState([]);
    const cu_profile = useContext(ProfileContext)  // get current user profile data
    const navigate = useNavigate()

    const { id } = useParams()


    const getProfileData = async () => {
        try {
            const res = await api.get(`api/profile/${id}/`)
            if (res.status === 200) {
                setProfile(res.data)
            } else {
                console.error('Error fetching profile data:', res.status);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    const getProfilePosts = async () => {
        try {
            const res = await api.get(`api/profile/${id}/posts`)
            if (res.status === 200) {
                setProfilePosts(res.data)
            } else {
                console.error('Error fetching  posts:', res.status);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    const creatPost = (data, page) => {
        api.post('api/posts/', data).then((res) => {
            if (res.status === 201) {
                console.log('post created ')
                getProfilePosts()
                getProfileData()
            }
        }).catch((error) => {
            console.log(error.response.data)
        })
    }

    // fetch profile data if the id in the url is not the same as the logged in user's id
    useEffect(() => {
        if (cu_profile.id != id) {
            getProfileData()
            // console.log(profile)
        } else {
            setisCUProfile(true);
            setProfile(cu_profile);
        }
        getProfilePosts()
    }, [id, cu_profile])

    // handling when clicked to a post on profile page
    const handleOnclickPost = (id) => {
        navigate(`posts/${id}`, { state: { posts: profilePosts, postid: "post" + id, profileId: profile.id } })
    };

    // handle follow a user   // have to work on it 
    const handleFollow = async (userId) => {
        if (profile.isFollowed) {
            const response = await unfollowUser(userId);
            getProfileData()
            console.log(response)
        } else {
            const response = await followUser(userId);
            getProfileData()
            console.log(response)
        }
    }

    const Underline = () => {  // underlineComponent
        return <><span className="absolute h-[2px] bg-black w-10/12 -bottom-1 left-1/2 -translate-x-1/2"></span></>
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
                        <div className="profileInfo ">
                            <p className={`flex  justify-center ${!isCUProfile && 'space-x-4 items-center'} `}>
                                <span className="profile-Name text-xl font-semibold ">{profile.username}</span>
                                {!isCUProfile && <><button onClick={() => handleFollow(profile.id)} className='follow-unfollow-btn  rounded text-sm px-1 py-[2px] bg-gray-700 text-white'>{profile.isFollowed ? "Following" : "Follow"}</button></>}
                            </p>
                            <p className="profile-bio mt-2 text-center ">{profile.bio}</p>
                            <div className="profile-stats mt-2 py-4 flex justify-center space-x-10">
                                <div className="profile-followers">
                                    <Link className='' to={'followers'}>
                                        <p className="font-semibold  text-center">{profile.followers}</p>
                                        <p className="text-center text-sm text-gray-500">Followers</p>
                                    </Link>
                                </div>
                                <div className="profile-followings">
                                    <Link className='' to={'followings'}>
                                        <p className="font-semibold  text-center">{profile.followings}</p>
                                        <p className="text-center text-sm text-gray-500">Followings</p>
                                    </Link>
                                </div>
                                <div className="profile-posts-count">
                                    <p className="font-semibold text-center">{profile.posts_count}</p>
                                    <p className="text-center text-sm text-gray-500">Posts</p>
                                </div>
                            </div>
                        </div>
                        {isCUProfile &&
                            <div className='px-4 mx-auto lg:w-2/3 xl:2-1/2 '>
                                <div className="grid grid-cols-2 gap-5 py-2 mb-4">
                                    <button className=' hover:bg-gray-900  py-1 bg-gray-700 rounded-lg text-white '>Edit Profile</button>
                                    {!showShare && <button onClick={() => setShowShare(!showShare)} className=' hover:bg-gray-900  py-1 bg-gray-700 rounded-lg text-white '>New Post</button>}
                                </div>
                                {showShare &&
                                    <div className="relative py-4">
                                        <span onClick={() => setShowShare(!showShare)} className='-right-2 absolute -top-4 bg-gray-50 p-1 hover:bg-gray-200'><Close /></span>
                                        <SharePost onShare={creatPost} />
                                    </div>}
                            </div>
                        }
                    </div>
                    <div className="profile-center lg:w-2/3">
                        <div className="profile-feed-contaier px-4 pt-2 pb-1">
                            <div className="border-b  flex justify-around  py-1">
                                <button className={`text-lg px-6 relative ${feedOP === 'posts' && 'font-semibold'}`} onClick={() => setfeedOp('posts')}>Posts {feedOP === 'posts' && <Underline />}</button>
                                <button className={`text-lg px-6 relative ${feedOP === 'videos' && 'font-semibold'}`} onClick={() => setfeedOp('videos')}>Videos {feedOP === 'videos' && <Underline />}</button>
                                <button className={`text-lg px-6 relative ${feedOP === 'saved' && 'font-semibold'}`} onClick={() => setfeedOp('saved')}>Saved {feedOP === 'saved' && <Underline />}</button>
                            </div>
                        </div>
                        <div className="profile-feed ">
                            {feedOP === 'posts' && <ProfilePosts posts={profilePosts} onclickPost={handleOnclickPost} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;