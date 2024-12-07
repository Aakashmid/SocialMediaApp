import { useContext, useEffect, useState } from "react";
import Feed from "../Components/Feed";
import { HomePageLoader } from "../Components/Loader";
import Layout from "../Components/Layout";
import {  useFetchUserProfile } from "../Components/apiService";
import { USER_ID } from "../Components/constants";
import Rightbar from "../Components/Rightbar";
import { LoadingContext } from "../Contexts/LoadingContext";
import { ProfileDataContext } from "../Contexts/ProfileContext";




export default function Home() {
  const { loading, setLoading } = useContext(LoadingContext);
  // const [ loading, setLoading ] = useState(false);
  const { profileData, setProfileData } = useContext(ProfileDataContext);
  const fetchUserProfile  = useFetchUserProfile();    // custom hook 
  const user_id = localStorage.getItem(USER_ID);


  const fetchProfielData = async () => {
    try {
      setLoading(true);
      const data = await fetchUserProfile(user_id);
      setProfileData(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } 
  }

  ////// incomplete , has to modify 
  useEffect(() => {
    if (!profileData || Object.keys(profileData).length === 0) {
      fetchProfielData();
    }
  }, [profileData, setLoading]);

  if (loading) {
    return <HomePageLoader />;
  }
  else {
    return (
      <>
        <Layout>
          <Feed />
          <Rightbar />
        </Layout>
      </>
    )
  }
}