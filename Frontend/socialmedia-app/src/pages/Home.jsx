import { useContext, useEffect, useCallback } from "react";
import Feed from "../Components/home/Feed";
import { HomePageLoader } from "../components/Loader";
import Layout from "../Layout/Layout";
import { useFetchUserProfile } from "../services/apiService";
import { USER_ID } from "../Components/constants";
import Rightbar from "../Components/common/Rightbar";
import { LoadingContext } from "../Contexts/LoadingContext";
import { ProfileDataContext } from "../Contexts/ProfileContext";

export default function Home() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { profileData, setProfileData } = useContext(ProfileDataContext);
  const fetchUserProfile = useFetchUserProfile(); // Custom hook
  const userId = localStorage.getItem(USER_ID);

  /**
   * Fetch user profile data if not already available.
   */
  const fetchProfileData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const data = await fetchUserProfile(userId);
      setProfileData(data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setLoading(false); // Ensure loading state is always updated
    }
  }, [fetchUserProfile, setProfileData, setLoading, userId]);

  // Fetch profile data on component mount if not already fetched
  useEffect(() => {
    if (!profileData || Object.keys(profileData).length === 0) {
      fetchProfileData();
    }
  }, [profileData, fetchProfileData]);

  if (loading) {
    return <HomePageLoader />;
  }

  return (
    <Layout>
      <Feed />
      <Rightbar />
    </Layout>
  );
}
