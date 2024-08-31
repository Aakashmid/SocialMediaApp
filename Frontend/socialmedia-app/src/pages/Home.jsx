import { useContext, useEffect } from "react";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { ProfileContext } from "../Components/context";
import Loader from "../Components/Loader";


export default function Home() {
  const profile = useContext(ProfileContext) // get profile object from context
  // useEffect(() => {
  //   if (!profile.id) { // if profile object not exist then redirect to login page
  //     return <><Loader /></>
  //   }
  // }, [profile])
  return (
    <>
      <Topbar />
      <div className="home-page-container lg:flex ">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="md:w-[650px] mx-auto lg:flex-[5] lg:ml-[25%] ">
          <Feed />
        </div>
        <div className="hidden lg:block lg:flex-[2] xl:flex-[2.5]">
          <Rightbar />
        </div>
      </div>
    </>
  )
}