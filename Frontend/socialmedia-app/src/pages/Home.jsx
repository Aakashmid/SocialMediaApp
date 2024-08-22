import { useState } from "react";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <div className="home-page-container lg:flex ">
      <div className="hidden lg:block flex-[2] xl:flex-[2.5]">
        <Sidebar />
      </div>
      <div className="absolute  lg:hidden w-full">
        {/* for small screen sidebar */}
        <span onClick={() => setShowSidebar(!showSidebar)} className="my-2">Hamburger</span>
        <div className="sidebar bg-white w-[60%] sm:w-[45%] md:[40%]">
          {showSidebar && <><Sidebar /></>}
        </div>
      </div>
      <div className="md:w-[650px] mx-auto lg:flex-[5]">
        <Feed />
      </div>
      <div className="hidden lg:block lg:flex-[2] xl:flex-[2.5]">
        <Rightbar />
      </div>
    </div>
  )
}
