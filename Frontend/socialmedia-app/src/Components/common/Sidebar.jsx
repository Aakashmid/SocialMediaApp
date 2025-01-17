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
import { Link, useNavigate } from "react-router-dom";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import { fetchFriends } from "../../services/apiService";

const Sidebar = ({ closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const { profileData } = useContext(ProfileDataContext);
  const navigate = useNavigate();
  // Fetch friends when profileData changes
  const getfriends = async () => {
    try {
      setLoading(true);
      const data = await fetchFriends();
      setFriends(data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
    finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    getfriends();
  }, []);

  // Reusable component for rendering following users
  const FriendUser = ({ user }) => (
    <li className="sidebarFriend hover:bg-gray-100 p-2">
      <Link
        to={`/profile/${user.username}`} state={{ userId: user.id }}
        className="flex space-x-4 items-center"
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
    <div className="sidebar-container w-full ">
      <div className="sidebar-wrapper p-4  overflow-y-scroll custom-scrollbar bg-white  h-[100vh]">
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
            <li key={label} className="hover:bg-blue-50  rounded-lg">
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
          friends.length > 0 && (
            <div className="following-list mt-4">
              <h2 className="text-lg font-medium">Friends</h2>
              <ul className="sidebarFriendList flex flex-col  mt-2">
                {friends.map((user, index) => (
                  index < 2 && < FriendUser user={user} key={user.id} />
                ))}
              </ul>
              <button onClick={() => navigate('/chat')} className="my-4 py-[6px] px-10 hover:font-medium rounded bg-gray-100">
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
