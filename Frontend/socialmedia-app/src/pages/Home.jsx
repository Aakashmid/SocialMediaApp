import { useContext, useEffect } from "react";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { HomePageLoader } from "../Components/Loader";
import Layout from "../Components/Layout";
import { LoadingContext, ProfileContext } from "../Components/Context";



export default function Home() {
  const { loading,setLoading} = useContext(LoadingContext); 
  const profile = useContext(ProfileContext) // get profile object from context
  console.log(loading)
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