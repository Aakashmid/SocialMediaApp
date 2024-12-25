import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Topbar from "../Components/common/Topbar";
import { ProfileDataContext } from "../Contexts/ProfileContext";
import Sidebar from "../Components/common/Sidebar";
import {
    CreatePost,
    fetchSavedPosts,
    fetchUserPosts,
    followUser,
    unfollowUser,
    useFetchUserProfile,
} from "../services/apiService";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileFeed from "../components/profile/ProfileFeed";
import ProfileActions from "../Components/profile/ProfileActions";
import useProfileData from "../hooks/useProfileData";
import { PostProvider } from "../Contexts/PostContext";

const Profile = () => {
    const { profileData, setProfileData } = useContext(ProfileDataContext); // Current user's profile data
    const [showShare, setShowShare] = useState(false);
    const [feedOP, setFeedOp] = useState("posts"); // Default to posts
    const [profilePosts, setProfilePosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { state } = useLocation();
    const { username } = useParams();

    const profileUserId = state?.userId ? parseInt(state.userId) : profileData?.id || null;

    const navigate = useNavigate();

    // for sending to 404 page 
    useEffect(() => {
        if (!state?.userId) {
            if (username !== profileData?.username) {
                navigate('/404')
            }
        }
    }, [state, username, profileData, navigate])



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
        const posts = feedOP === "posts" ? profilePosts : savedPosts;
        const postUrl = feedOP === "saved" ? `saved-posts/${id}` : `posts/${id}`;

        navigate(postUrl, {
            state: {
                posts: posts,
                postid: "post" + id,
                profileId: profile.id,
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
        if (profileUserId !== null) {
            if (feedOP === "posts" && profilePosts.length === 0) {
                console.log('fetched psost')
                getProfilePosts();
            } else if (feedOP === "saved" && savedPosts.length === 0) {
                getSavedPosts();
            }
        }
    }, [profileUserId, feedOP]);

    return (
        <>
            <Topbar />
            <div className="profile-page-container lg:flex">
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
                <PostProvider value={{
                    posts: feedOP === "posts" ? profilePosts : savedPosts,
                    setPosts: feedOP === "posts" ? setProfilePosts : setSavedPosts
                }}>
                    <div className="profile-wrapper w-full md:w-[650px] md:mx-auto md:shadow-lg min-h-[100vh] flex-[5] lg:ml-[25%]">
                        <div className="profile-top">
                            <div className="profileCover relative">
                                <img
                                    src="/src/assets/post/3.jpeg"
                                    className="cover-img w-full h-36 object-cover"
                                    alt="..."
                                />
                                <img
                                    src={profile.profileImg || "/default-profile.png"} // Fallback for missing image
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
                        />
                    </div>
                </PostProvider>
            </div>
        </>
    );
};

export default Profile;
