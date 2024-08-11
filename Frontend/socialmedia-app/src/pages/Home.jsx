import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";

export default function Home() {
  return (
    <div className="home-page-container flex ">
      <Sidebar/>
      <Feed/>
      <Rightbar/>
    </div>
  )
}
