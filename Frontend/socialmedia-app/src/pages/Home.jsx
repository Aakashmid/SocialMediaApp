import { useEffect, useState } from "react";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import api from "../Api";
import { Apps, Cancel } from "@mui/icons-material";


export default function Home({ User }) {
  // const [profileData, setProfileData] = useState([])
  // const [showSidebar, setShowSidebar] = useState(false)
  // useEffect(() => {
  //   api.get('api/profile/').then((res) => setProfileData(res.data)).catch((error) => console.log(error))
  // }, []) // this function runs first time when page reloded

  return (
    <div className="home-page-container lg:flex ">

      <div className="absolute lg:hidden w-full flex ">
        {/* for small screen sidebar */}
        {showSidebar &&
          <div className="sidebar bg-white  w-[60%] sm:w-[45%] md:[40%]">
            <><Sidebar /></>
          </div>
        }
        {!showSidebar ? <span onClick={() => setShowSidebar(!showSidebar)} className=""><Apps /></span> :
          <span onClick={() => setShowSidebar(!showSidebar)} className=""><Cancel /></span>}
      </div>

      <div className="hidden lg:block flex-[2] xl:flex-[2.5] ">
        <Sidebar />
      </div>
      <div className="md:w-[650px] mx-auto lg:flex-[5]">
        <Feed currentUser={User} />
      </div>
      <div className="hidden lg:block lg:flex-[2] xl:flex-[2.5]">
        <Rightbar />
      </div>
    </div>
  )
}
