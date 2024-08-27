import { useState } from "react";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import { Apps, Cancel } from "@mui/icons-material";
import Topbar from "../Components/Topbar";


export default function Home({ User }) {
  const [showSidebar, setShowSidebar] = useState(false)
  return (

    <>
      <Topbar />
      <div className="home-page-container lg:flex ">
        <div className="fixed lg:hidden w-full flex ">
          {/* for small screen sidebar */}
          {showSidebar &&
            <div className="sidebar  bg-white  w-[60%] sm:w-[45%] md:[40%]">
              <><Sidebar /></>
            </div>
          }
          {!showSidebar ? <span onClick={() => setShowSidebar(!showSidebar)} className=""><Apps /></span> :
            <span onClick={() => setShowSidebar(!showSidebar)} className=""><Cancel /></span>}
        </div>

        <div className="hidden lg:block  flex-[2] xl:flex-[2.5] ">
          <Sidebar />
        </div>
        <div className="md:w-[650px] mx-auto lg:flex-[5]">
          <Feed currentUser={User} />
        </div>
        <div className="hidden lg:block lg:flex-[2] xl:flex-[2.5]">
          <Rightbar />
        </div>
      </div>
    </>
  )
}
