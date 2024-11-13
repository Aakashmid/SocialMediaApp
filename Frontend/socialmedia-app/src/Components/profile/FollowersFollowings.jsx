import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { ArrowBack } from '@mui/icons-material'
import {ProfileDataContext } from '../Contexts/ProfileContext'
import { fetchUserProfile } from '../apiService'


export default function FollowersFollowings() {
    const { id, str } = useParams();  // str is string represent whethere this page is for followers of followings or user
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const {profileData,setProfileData} = useContext(ProfileDataContext);

    const User = () => {
        return (
            <>

            </>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            if (id != profileData.id) {
                try {
                    setLoading(true);
                    const userData = await fetchUserProfile(id);
                    setProfile(userData);
                } catch (error) {
                    console.error(error);
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                setProfile(profileData)
            }
        }
        fetchData();
    }, [id])
    return (
        <>
            <Layout>
                <div className={`${str}-page-wrapper p-5`}>
                    <div className="page-top">
                        <div className="flex items-center space-x-6">
                            <Link to={`/profile/${id}`} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                            {/* <h2 className='text-lg xl:text-xl font-medium'>{profile.username + '\'s ' + str}</h2> */}
                        </div>
                    </div>
                    <div className="mt-5">
                        {/* <Posts posts={posts} /> */}
                    </div>
                </div>
            </Layout>
        </>
    )
}
