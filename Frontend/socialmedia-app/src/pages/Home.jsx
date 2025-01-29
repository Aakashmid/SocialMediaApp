import { useContext, useEffect, useCallback } from "react";
import Feed from "../Components/home/Feed";
import { HomePageLoader } from "../Components/Loader";
import Layout from "../Layout/Layout";
import { useFetchUserProfile } from "../services/apiService";
import { USER_ID } from "../Components/constants";
import Rightbar from "../Components/common/Rightbar";
import { LoadingContext } from "../Contexts/LoadingContext";
import { ProfileDataContext } from "../Contexts/ProfileContext";
import { PostProvider } from "../Contexts/PostContext";

export default function Home({ isAuthorized }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const { profileData, setProfileData } = useContext(ProfileDataContext);
  const fetchUserProfile = useFetchUserProfile();
  const userId = localStorage.getItem(USER_ID);

  // Fetch user profile if not already available
  const fetchProfileData = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await fetchUserProfile(userId);
      setProfileData(data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile, setProfileData, setLoading, userId]);

  useEffect(() => {
    if (!profileData || Object.keys(profileData).length === 0) {
      fetchProfileData();
    }
  }, [profileData, fetchProfileData, isAuthorized]);

  // Render loader if data is still loading
  if (loading) return <HomePageLoader />;

  // Render main content
  return (
    <Layout>
      <PostProvider>
        <Feed />
      </PostProvider>
      <Rightbar />
    </Layout>
  );
}
