import { useContext, useEffect } from "react";
import Feed from "../Components/Feed";
import { HomePageLoader } from "../Components/Loader";
import Layout from "../Components/Layout";
import {ProfileDataContext } from "../Components/Contexts/ProfileContext";
import { LoadingContext } from "../Components/Contexts/LoadingContext";
import { fetchUserProfile } from "../Components/apiService";
import { USER_ID } from "../Components/constants";



export default function Home() {
  const { loading, setLoading } = useContext(LoadingContext);
  const {profileData,setProfileData} = useContext(ProfileDataContext);
  const user_id = localStorage.getItem(USER_ID);


  ////// incomplete , has to modify 
  useEffect(  () => {
    if (!profileData) {
      setLoading(true);
      const res =  fetchUserProfile(user_id);
      setProfileData(res.data);
    }
    setLoading(false);
  }, [profileData, setLoading]);


  if (loading) return <HomePageLoader />;
  return (
    <>
      <Layout>
        <Feed />
        {/* <Rightbar /> */}
      </Layout>
    </>
  )
}