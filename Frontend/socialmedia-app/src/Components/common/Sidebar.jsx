import { RssFeed, Chat, School, Event, WorkOutline, HelpOutline, Bookmark, PlayCircleFilledOutlined, Group } from "@mui/icons-material"
import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../Api";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import {fetchUserFollowings, useFetchUserProfile} from "../../services/apiService";
export default function Sidebar() {
  const [followings, setFollowings] = useState([]);
  const dataFetchedRef = useRef(false);
  const followingsRef = useRef([]);
  const {profileData}= useContext(ProfileDataContext)

  
  //incomplete 
  const getFollowings = async (user_id) => {
    try {
      const data = await fetchUserFollowings(user_id);
      // followingsRef.current = res.data;
      setFollowings(data);
    } catch (error) {
      console.error("Failed to fetch followings : ", error)
    }
  }


  // reusable followingUser card component
  const FollowingUser= ({ user }) => {
    return (
      <li className="sidebarFriend">
        <Link to={`/profile/${user.id}`} className=" flex space-x-4 items-center p-1">
          <img src={user.profileImg} alt=".." className="sidebarFriendImg w-8 h-8 rounded-[50%] object-cover" />
          <span className="sidebarFriendName">{user.username}</span>
        </Link>
      </li>)
  }


  // have to modify so that getFollowings function not run every time
  useEffect(() => {
    if (profileData.id && !dataFetchedRef.current) { // Check if profile exists and data hasn't been fetched
      getFollowings(profileData.id);
      dataFetchedRef.current = true; // Mark data as fetched
    } else {
      setFollowings(followingsRef.current);
    }
  }, [profileData]);

  return (
    <div className="sidebar-container lg:w-1/4 w-[60%] sm:w-[45%] md:w-[40%] fixed z-20">
      <div className="sidebar-wrapper py-3  px-5  h-[100vh] overflow-y-scroll custom-scrollbar bg-white ">
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
              return <FollowingUser user={user} key={user.id} />
            })}
          </ul>
          <button className="my-4 py-[6px] px-10 font-medium  rounded bg-gray-100 ">Show more</button>
        </div>

      </div>
    </div>
  )
}