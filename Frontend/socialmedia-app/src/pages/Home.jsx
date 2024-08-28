import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";


export default function Home({ User }) {
  return (

    <>
      <Topbar />
      <div className="home-page-container lg:flex ">
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
