import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProfileDataContext } from "../Contexts/ProfileContext";
import {
    CreatePost,
    fetchSavedPosts,
    fetchUserPosts,
    followUser,
    unfollowUser,
} from "../services/apiService";

import ProfileHeader from "../Components/profile/ProfileHeader";
import ProfileStats from "../Components/profile/ProfileStats";
import ProfileFeed from "../Components/profile/ProfileFeed";
import ProfileActions from "../Components/profile/ProfileActions";
import useProfileData from "../hooks/profile/useProfileData";
import { PostContext, PostProvider } from "../Contexts/PostContext";
import Layout2 from "../Layout/Layout2";

const Profile = () => {
    const { profileData, setProfileData } = useContext(ProfileDataContext); // Current user's profile data
    const { posts, setPosts } = useContext(PostContext);
    const [showShare, setShowShare] = useState(false);
    const [feedOP, setFeedOp] = useState("posts"); // Default to posts
    const [fetchedFeedOps, setFetchedFeedOps] = useState({
        posts: false,
        saved: false,
    });
    const [profilePosts, setProfilePosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { state } = useLocation();
    const { username } = useParams();

    const profileUserId = state?.userId ? parseInt(state.userId) : profileData?.id || null;

    const navigate = useNavigate();

    // for sending to 404 page 
    useEffect(() => {
        if (profileData && profileData.username) {
            const shouldRedirectTo404 = !state?.userId && username && username !== profileData?.username
            if (shouldRedirectTo404) {
                navigate('/404')
            }
        }
    }, [state, username, profileData])


    // Using custom hook for profile data
    const { profile, setProfile, isCUProfile } = useProfileData(profileUserId, profileData);


    const getProfilePosts = async () => {
        setLoading(true);
        try {
            const data = await fetchUserPosts(profileUserId);
            setProfilePosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const getSavedPosts = async () => {
        // if (savedPosts.length === 0) {
        setLoading(true);
        try {
            const data = await fetchSavedPosts();
            setSavedPosts(data);
        } catch (error) {
            console.error("Error fetching saved posts:", error);
        } finally {
            setLoading(false);
        }
        // }
    };


    const handleCreatePost = async (post_data) => {
        try {
            const newPost = await CreatePost(post_data);
            setProfileData((prevData) => ({
                ...prevData,
                posts_count: prevData.posts_count + 1,
            }));
            setProfilePosts((prevPosts) => [...prevPosts, newPost]);
        } catch (error) {
            console.error(error);
        }
    };


    // click post handler to go to the profile posts page
    const handleOnclickPost = (id) => {
        const postUrl = feedOP === "saved" ? `saved-posts/${id}` : `posts/${id}`;
        navigate(postUrl, {
            state: {
                postid: "post" + id,
                profileId: profile.id,
                isSavedPosts: feedOP === "saved" ? true : false,
            },
        });
    };

    const handleFollow = async (userId) => {
        try {
            if (profile.isFollowed) {
                await unfollowUser(userId);
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    followers_count: prevProfile.followers_count - 1,
                    isFollowed: false,
                }));
                if (profile.id !== profileData.id) {
                    setProfileData((prevData) => ({
                        ...prevData,
                        followings_count: prevData.followings_count - 1,
                    }));
                }
            } else {
                await followUser(userId);
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    followers_count: prevProfile.followers_count + 1,
                    isFollowed: true,
                }));
                if (profile.id !== profileData.id) {
                    setProfileData((prevData) => ({
                        ...prevData,
                        followings_count: prevData.followings_count + 1,
                    }));
                }
            }
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
        }
    };


    useEffect(() => {
        // Reset fetchedFeedOps whenever profileUserId changes
        setFetchedFeedOps({
            posts: false,
            saved: false,
        });
    }, [profileUserId]);

    useEffect(() => {
        // Fetch profile data and posts when profileUserId changes and for same profile fetching it only once
        if (profileUserId !== null) {
            if (feedOP === "posts" && !fetchedFeedOps.posts) {
                getProfilePosts().then(() => {
                    setFetchedFeedOps((prev) => ({ ...prev, posts: true }));
                });
            } else if (feedOP === "saved" && !fetchedFeedOps.saved) {

                getSavedPosts().then(() => {
                    setFetchedFeedOps((prev) => ({ ...prev, saved: true }));
                });
            }
        }

        // setting posts for postcontext for profile
        if (feedOP === "saved" && savedPosts.length != 0 && profileUserId !== null) {
            setPosts(savedPosts);
        }
        else if (feedOP === "posts" && profilePosts.length != 0 && profileUserId !== null) {
            setPosts(profilePosts);
        }
    }, [profileUserId, feedOP, fetchedFeedOps]);
    return (
        <>
            <div className="profile-page-container ">
                <Layout2>

                    <PostProvider value={{
                        posts: feedOP === "posts" ? profilePosts : savedPosts,
                        setPosts: feedOP === "posts" ? setProfilePosts : setSavedPosts
                    }}>
                        <div className="profile-wrapper ">
                            <div className="profile-top">
                                <div className="profileCover relative">
                                    <img
                                        src="/images/post/3.jpeg"
                                        className="cover-img w-full h-36 object-cover"
                                        alt="..."
                                    />
                                    <img
                                        src={profile.profileImg || "/images/default-profile.png"} // Fallback for missing image
                                        className="profile-img w-28 h-28 rounded-[50%] absolute left-1/2 top-20 object-cover -translate-x-1/2 border-4 border-white"
                                        alt=""
                                    />
                                    <div className="w-full h-16"></div>
                                </div>
                                <ProfileHeader
                                    profile={profile}
                                    isCUProfile={isCUProfile}
                                    handleFollow={handleFollow}
                                />
                                <ProfileStats profile={profile} />

                                {isCUProfile && (
                                    <ProfileActions
                                        showShare={showShare}
                                        setShowShare={setShowShare}
                                        handleCreatePost={handleCreatePost}
                                        profileData={profileData}
                                    />
                                )}
                            </div>
                            <ProfileFeed
                                setFeedOp={setFeedOp}
                                feedOP={feedOP}
                                loading={loading}
                                handleOnclickPost={handleOnclickPost}
                                isCUProfile={isCUProfile}
                            />
                        </div>
                    </PostProvider>
                </Layout2>
            </div>
        </>
    );
};

export default Profile;
