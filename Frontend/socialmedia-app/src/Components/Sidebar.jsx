import { RssFeed, Chat, School, Event, WorkOutline, HelpOutline, Bookmark, PlayCircleFilledOutlined, Group } from "@mui/icons-material"
import { Link } from "react-router-dom"
export default function Sidebar() {
  return (
    <div className="sidebar-wrapper p-5 h-[100vh]">
      <ul className="sideBar-list flex flex-col space-y-1">
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4" ><RssFeed /> <span className="lg:text-lg">Feed</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><Chat /><span className="lg:text-lg">Chat</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><PlayCircleFilledOutlined /><span className="lg:text-lg">Videos</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><Group /><span className="lg:text-lg">Groups</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><Bookmark /><span className="lg:text-lg">Bookmarks</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><HelpOutline /><span className="lg:text-lg">Questions</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><WorkOutline /><span className="lg:text-lg">Job</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><Event /><span className="lg:text-lg">Event</span></Link>
        </li>
        <li className="hover:bg-blue-200">
          <Link to={'/'} className="py-[5px] flex items-center space-x-4"><School /><span className="lg:text-lg">Courses</span></Link>
        </li>
      </ul>
      <button className="my-4 py-[6px] px-10 font-medium  rounded bg-gray-100 ">Show more</button>
      <hr className="bg-gray-300 h-[2px]" />
    </div>
  )
}
