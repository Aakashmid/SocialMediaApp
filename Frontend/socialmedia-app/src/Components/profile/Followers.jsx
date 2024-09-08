import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { ArrowBack } from '@mui/icons-material'
import { ProfileContext } from '../context'

export default function Followers() {
    const { id, str } = useParams();
    const profile = useContext(ProfileContext);
    return (
        <>
            <Layout>
                <div className={`${str}-page-wrapper `}>
                    <div className="page-top">
                        <div className="flex items-center space-x-6">
                            <Link to={`/profile/${id}`} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                            {/* <h2 className='text-lg xl:text-xl font-medium'>{profile.id === id ? '' : profile.username + '\'s posts'}</h2> */}
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
