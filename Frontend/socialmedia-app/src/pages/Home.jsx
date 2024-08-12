import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";

export default function Home() {
  return (
    <div className="home-page-container lg:flex ">
      <div className="hidden  md:block lg:flex-[2] xl:flex-[2.5]">
        <Sidebar />
      </div>
      <div className="lg:flex-[5]">
        <Feed />
      </div>
      <div className="hidden md:block lg:flex-[2] xl:flex-[2.5]">
        <Rightbar />
      </div>
    </div>
  )
}
