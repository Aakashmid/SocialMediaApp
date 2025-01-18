import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../Layout/Layout'
import { fetchUserFollowers, fetchUserFollowings, useFetchUserProfile, followUser, unfollowUser } from '../../services/apiService'
import { PageTopBackArrow } from '../common/SmallComponents'
import { ProfileDataContext } from '../../Contexts/ProfileContext';
import UserCard from '../common/UserCard'


export default function FollowersFollowings() {
    const { str } = useParams();  // str is string represent whether this page is for followers or followings of  user
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);           // here data is user followings or followers
    const { profileData, setProfileData } = useContext(ProfileDataContext);
    const fetchUserProfile = useFetchUserProfile();
    const navigate = useNavigate();
    const state = useLocation().state;
    const id = state?.userId ? parseInt(state.userId) : profileData?.id || null;  // here id is id  of user whose followers or followings we are showing



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

    // fetch followers or followings of user
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
        if (Object.keys(profileData).length > 0) {
            if (id != profileData.id) {
                fetchData();
            }
            else {
                setProfile(profileData); // set profile data if id is same as profileData.id
            }
        }
        getFollowersOrFollowings(id);
    }, [id, profileData.id])



    const getpageHeading = (() => {
        const capitalizedStr = `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
        if (profile.id && profile.id !== profileData.id) {
            return `${profile.username}'s ${capitalizedStr}`;
        } else if (profileData.id) {
            return `${capitalizedStr}`;
        }
        return ''; // Default empty string while loading
    });

    return (
        <>
            <Layout>
                {loading || !profile.id ? <>Loading  ...</> :
                    <div className={`${str}-page-wrapper p-5`}>
                        <PageTopBackArrow pageHeading={getpageHeading()} backTo={-1} />
                        <div className="mt-4">
                            {data.map(user => {
                                return <UserCard user={user} key={user.id} setData={setData} />
                            })}
                            {/* <User */}
                        </div>
                    </div>
                }
            </Layout>
        </>
    )
}
