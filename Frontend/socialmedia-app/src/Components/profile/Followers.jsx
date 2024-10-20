import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { ArrowBack } from '@mui/icons-material'
import { ProfileContext } from '../Context'
import { fetchUserProfile } from '../apiService'

export default function Followers() {
    const { id, str } = useParams();  // str is string represent whethere this page is for followers of followings or user
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const cu_profile = useContext(ProfileContext); // cu - current user

    const User = () => {
        return (
            <>

            </>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            if (id != cu_profile.id) {
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
                setProfile(cu_profile)
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
