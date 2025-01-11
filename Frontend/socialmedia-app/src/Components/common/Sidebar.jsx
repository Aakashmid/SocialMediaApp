import {
  RssFeed,
  Chat,
  School,
  Event,
  WorkOutline,
  HelpOutline,
  Bookmark,
  PlayCircleFilledOutlined,
  Group,
} from "@mui/icons-material";
import { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import { fetchUserFollowings } from "../../services/apiService";

const Sidebar = ({ closeSidebar }) => {
  const [followings, setFollowings] = useState([]);
  const { profileData } = useContext(ProfileDataContext);

  // Fetch followings when profileData changes
  const getFollowings = useCallback(async () => {
    try {
      if (profileData?.id) {
        const data = await fetchUserFollowings(profileData.id);
        setFollowings(data); // Update followings state
      }
    } catch (error) {
      console.error("Failed to fetch followings:", error);
    }
  }, [profileData?.id]);



  useEffect(() => {
    getFollowings();
  }, [getFollowings]);

  // Reusable component for rendering following users
  const FriendUser = ({ user }) => (
    <li className="sidebarFriend">
      <Link
        to={`/profile/${user.username}`} state={{ userId: user.id }}
        className="flex space-x-4 items-center p-1"
      >
        <img
          src={user.profileImg}
          alt=".."
          className="sidebarFriendImg w-8 h-8 rounded-full object-cover"
        />
        <span className="sidebarFriendName">{user.username}</span>
      </Link>
    </li>
  );

  return (
    // <div className="sidebar-container w-full  md:w-[16rem] xl:w-[21rem]">
    <div className="sidebar-container w-full ">
      <div className="sidebar-wrapper py-3 px-2  overflow-y-scroll custom-scrollbar bg-white  h-[100vh]">
        <ul className="sideBar-list flex flex-col space-y-1">
          {[
            { label: "Feed", Icon: RssFeed, path: "/" },
            { label: "Chat", Icon: Chat, path: "/chat" },
            { label: "Videos", Icon: PlayCircleFilledOutlined, path: "/" },
            { label: "Groups", Icon: Group, path: "/" },
            { label: "Bookmarks", Icon: Bookmark, path: `/profile/${profileData?.username}/saved-posts/`, state: { isSavedPosts: true } },
            { label: "Questions", Icon: HelpOutline, path: "/" },
            { label: "Job", Icon: WorkOutline, path: "/" },
            { label: "Event", Icon: Event, path: "/" },
            { label: "Courses", Icon: School, path: "/" },
          ].map(({ label, Icon, path, state }) => (
            <li key={label} className="hover:bg-blue-200 rounded-lg">
              <Link
                to={path} onClick={closeSidebar} state={state}
                className="py-[5px] px-2 flex items-center  space-x-4"
              >
                <Icon />
                <span className="text-lg text-gray-700 font-medium">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <hr className="bg-gray-300 h-[2px] my-2" />
        {
          followings.length > 0 && (
            <div className="following-list mt-4">
              <h2 className="text-lg font-medium">Friends</h2>
              <ul className="sidebarFriendList flex flex-col space-y-[6px] mt-2">
                {followings.map((user) => (
                  <FriendUser user={user} key={user.id} />
                ))}
              </ul>
              <button className="my-4 py-[6px] px-10 font-medium rounded bg-gray-100">
                Show more
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Sidebar;
