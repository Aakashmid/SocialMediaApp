import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Layout'
import { ArrowBack } from '@mui/icons-material'
import { ProfileDataContext } from '../Contexts/ProfileContext'
import { fetchUserFollowers, fetchUserFollowings, fetchUserProfile, followUser, unfollowUser } from '../apiService'


export default function FollowersFollowings() {
    const { id, str } = useParams();  // str is string represent whether this page is for followers or followings of  user
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);           // here data is user followings or followers
    const { profileData, setProfileData } = useContext(ProfileDataContext);

    
    const handelFollowUnfollow = async (user) =>{
        try {
            var followBtn = document.getElementById(`followBtn${user.id}`);
            if (user.isFollowed) {
                const response = await unfollowUser(user.id);
                setProfileData({...profileData,followers_count:profileData.followers_count-1,isFollowed:false})
                setData(data.map(item => 
                    item.id === user.id ? { ...item, isFollowed: false } : item
                ));
                // followBtn.innerText='Follow';
                console.log('unfollowed user')
            } else {
                const response = await followUser(user.id);
                setProfileData({...profileData,followers_count:profileData.followers_count+1,isFollowed:true})
                setData(data.map(item => 
                    item.id === user.id ? { ...item, isFollowed: true } : item
                ));
                // followBtn.innerText='Following';
                console.log('following user');
            }
        } catch (error) {
            console.error(error);
        }
        
    }
    const UserCard = ({user}) => {
        return (
            <>
                <div className='flex px-2 py-4 items-center justify-between'>
                    <div className="flex items-center space-x-4">
                        <img src={user.profileImg} className='w-9 h-9 rounded-[50%] object-cover border border-gray-400 cursor-pointer' alt="..." />
                        <h4 className='username font-normal text-xl'>{user.username}</h4>
                    </div>
                    <div className="card-button">
                        {/* <button } className='bg-gray-800  text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 cursor-pointer'>{}Follow</button> */}
                        <button id={`followBtn${user.id}`} onClick={()=>handelFollowUnfollow(user, str)} className='bg-bg1  text-white px-3 py-1 md:py-[6px] lg:py-[] rounded-md font-medium cursor-pointer'>{user.isFollowed ? "Following" : "Follow"}</button>
                    </div>
                </div>
            </>
        )
    }

    const getFollowersOrFollowings = async (userId) => {
        try {
            setLoading(true);
            var res_data;
            if (str === "followings") {
                res_data = await fetchUserFollowings(userId);
                console.log(res_data);
            }
            else if (str === 'followers') {
                 res_data = await fetchUserFollowers(userId);
            }
            else {
                throw new Error('Invalid request');
            }
            setData(res_data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching  data:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userData = await fetchUserProfile(id);
                setProfile(userData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

        if (id != profileData.id) {
            fetchData();
        }
        else {
            setProfile(profileData)
        }
        getFollowersOrFollowings(id);
    }, [id])


    return (
        <>
            <Layout>
                <div className={`${str}-page-wrapper p-5`}>
                    <div className="page-top">
                        <div className="flex items-center space-x-4">
                            <Link to={`/profile/${id}`} className='p-1 hover:bg-gray-200 rounded'><ArrowBack /></Link>
                            <h2 className='text-lg xl:text-xl font-medium'>{profile!=profileData ?  profile.username + '\'s ' + str.charAt(0).toUpperCase()+str.slice(1) : str.charAt(0).toUpperCase()+str.slice(1)}</h2>
                        </div>
                    </div>
                    <div className="mt-5">
                        {data.map(user => {
                            return user.id!=profileData.id && <UserCard user={user} key={user.id} />
                        })}
                        {/* <User */}
                    </div>
                </div>
            </Layout>
        </>
    )
}
