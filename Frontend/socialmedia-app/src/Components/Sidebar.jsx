import { RssFeed, Chat, School, Event, WorkOutline, HelpOutline, Bookmark, PlayCircleFilledOutlined, Group } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../Api"
import { ProfileContext } from "./context"
export default function Sidebar() {
  const [followings, setFollowings] = useState([])
  const profile = useContext(ProfileContext)
  // const getFollowings = () => {
  //   try {
  //     api.get(`api/followings/${profile.id}`).then((res) => setFollowings(res.data)).catch((error) => console.error(error))
  //   } catch (error) {
  //     console.error("Failed to fetch followings : ", error)
  //   }
  //   // finally {
  //   // }
  // }
  const getFollowings = async () => {
    try {
      const res = await api.get(`api/followings/${profile.id}`)
      if (res.status === 200) {
        setFollowings(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.error("Failed to fetch followings : ", error)
    }
    // finally {
    // }
  }

  const Following = ({ user }) => {
    return (
      <li className="sidebarFriend">
        <Link to={'/'} className=" flex space-x-4 items-center p-1">
          <img src={user.profileImg} alt=".." className="sidebarFriendImg w-8 h-8 rounded-[50%] object-cover" />
          <span className="sidebarFriendName">{user.username}</span>
        </Link>
      </li>)
  }

  useEffect(() => {
    if (profile.id) {  // if profile object exist then call getFollowings functions
      getFollowings()
    }
  }, [profile])

  return (
    <div className="sidebar-wrapper py-3  px-5  h-[100vh] overflow-y-scroll custom-scrollbar ">
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
      <hr className="bg-gray-300 h-[2px] my-2" />
      <div className="friends-list mt-4">
        <h2 className="text-lg font-medium">Followings</h2>
        <ul className="sidebarFriendList flex flex-col space-y-[6px] mt-2">
          {followings.map((user) => {
            return <Following user={user} key={user.id} />
          })}
        </ul>
        <button className="my-4 py-[6px] px-10 font-medium  rounded bg-gray-100 ">Show more</button>
      </div>

    </div>
  )
}
