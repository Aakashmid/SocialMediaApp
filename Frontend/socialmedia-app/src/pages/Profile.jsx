import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Topbar from '../Components/Topbar'
import SharePost from '../Components/SharePost'

const Profile = () => {
    const { id } = useParams()
    return (
        <>
            <Topbar />
            <div className="profile-wrapper w-full">
                <div className="profile-top">
                    <div className="profileCover relative">
                        <img src="/src/assets/post/3.jpeg" className='cover-img w-full h-44 object-cover' alt="..." />
                        <img src="/src/assets/person/1.jpeg" className='profile-img w-32 h-32 rounded-[50%] absolute left-1/2 top-28 object-cover -translate-x-1/2 border-4 border-white' alt="" />
                        <div className="w-full h-16"></div>
                    </div>
                    <div className="profileInfo mt-2">
                        <h2 className="profile-Name text-lg font-semibold text-center">Gal Gaddot</h2>
                        <p className="profile-bio text-center ">I am a Python - Django Developer</p>
                        <div className="mt-2 py-4 flex justify-center space-x-10">
                            <div className="profile-followers">
                                <Link className=''>
                                    <p className="font-semibold text-lg text-center">300k</p>
                                    <p className="text-center">Followers</p>
                                </Link>
                            </div>
                            <div className="profile-followings">
                                <Link className=''>
                                    <p className="font-semibold text-lg text-center">300</p>
                                    <p className="text-center">Followings</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <SharePost />
                    </div>
                    <div className="profile-feed p-4">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;