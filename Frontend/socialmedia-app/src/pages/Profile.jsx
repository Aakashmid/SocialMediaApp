import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Topbar from '../Components/Topbar'
import SharePost from '../Components/SharePost'
import { ProfileContext } from '../Components/context'
import api from '../Api'
import Sidebar from '../Components/Sidebar'

const Profile = () => {
    const { id } = useParams()
    const cu_profile = useContext(ProfileContext)  // get current user profile data

    let [profile, setProfile] = useState({});
    const [isCUProfile, setisCUProfile] = useState(false) // is currentuserprofie

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

    // fetch profile data if the id in the url is not the same as the logged in user's id
    useEffect(() => {
        if (cu_profile.id != id) {
            getProfileData()
            // console.log(profile)
        } else {
            setisCUProfile(true);
            setProfile(cu_profile);
        }
    }, [])
    return (
        <>
            <Topbar />
            <div className="profile-page-contanier lg:flex ">
                <div className="hidden lg:block ">
                    <Sidebar />
                </div>
                <div className="profile-wrapper w-full flex-[5] lg:ml-[25%]">
                    <div className="profile-top">
                        <div className="profileCover relative">
                            <img src="/src/assets/post/3.jpeg" className='cover-img w-full h-36 object-cover' alt="..." />
                            <img src="/src/assets/person/1.jpeg" className='profile-img w-28 h-28 rounded-[50%] absolute left-1/2 top-20 object-cover -translate-x-1/2 border-4 border-white' alt="" />
                            <div className="w-full h-16"></div>
                        </div>
                        <div className="profileInfo ">
                            <p className={`flex  justify-center ${!isCUProfile && 'space-x-4 items-center'} `}>
                                <span className="profile-Name text-xl font-semibold ">{profile.username}</span>
                                {!isCUProfile && <><button className='follow-unfollow-btn  rounded text-sm px-1 py-[2px] bg-gray-700 text-white'>Follow</button></>}
                            </p>
                            <p className="profile-bio mt-2 text-center ">{profile.bio}</p>
                            <div className="profile-stats mt-2 py-4 flex justify-center space-x-10">
                                <div className="profile-followers">
                                    <Link className=''>
                                        <p className="font-semibold  text-center">{profile.followers}</p>
                                        <p className="text-center text-sm text-gray-500">Followers</p>
                                    </Link>
                                </div>
                                <div className="profile-followings">
                                    <Link className=''>
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
                            <div className="p-4">
                                <SharePost />
                            </div>
                        }
                        <div className="profile-feed-contaier p-4">
                            <div className="border-b float-left">
                                <button className=''></button>
                                <button className=''></button>
                            </div>
                            <div className="profile-feed">
                                <div className="posts-container">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;