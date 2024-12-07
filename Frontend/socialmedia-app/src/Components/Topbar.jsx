import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfilePopover from "./Topbar/ProfilePopover";
import { SearchRounded, MessageRounded, PersonRounded, NotificationsRounded, Person, PersonOutline, ExitToApp, Close } from '@mui/icons-material/';
import { useContext, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileDataContext } from "../Contexts/ProfileContext";

export default function Topbar() {
    const [showProPopover, setShowProPopover] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isClickable, setIsClickable] = useState(false);
    const {profileData} = useContext(ProfileDataContext);
    return (<>
        <header>
            <div className="topbarContainer z-30 fixed bg-bgPrimary w-full px-3 md:px-4  xl:px-5 flex items-center justify-between py-2 ">
                <div className='flex items-center topbar-left'>
                    <div className="lg:hidden mr-2">
                        {showSidebar ? <span className="w-fit" onClick={() => setShowSidebar(!showSidebar)}><Close htmlColor="white" /></span>
                            : <span className="w-fit" onClick={() => setShowSidebar(!showSidebar)}><MenuIcon htmlColor="white" /></span>
                        }
                    </div>

                    <Link className="Logo text-white font-medium text-2xl" to={'/'}><span>Buzzline</span></Link>
                </div>
                <div className="topbar-center hidden md:flex md:items-center md:space-x-4 xl:space-x-6  ">
                    <div className="searchBar bg-white rounded-[30px] px-2  flex items-center md:w-[300px] lg:w-[400px] xl:w-[500px]">
                        {/* search bar form */}
                        <form action="#" className="w-full flex items-center">
                            <span className="py-1  cursor-pointer px-2">
                                <SearchRounded className="hover:text-blue-800" />
                            </span>
                            <input type="text" name="query" className="search-query bg-transparent focus:outline-none px-2 text-sm py-[6px] flex-grow " placeholder="Search post or friend  " />
                        </form>
                    </div>
                    <div className="topbar-links flex space-x-3 text-white">
                        <Link to={'/'} >Homepage</Link>
                        <Link to={'/'} >Timeline</Link>
                    </div>
                </div>
                <div className="topbar-right flex items-center space-x-3 lg:space-x-5 ">
                    <ul className="topbar-icons hidden md:flex items-center space-x-2 lg:space-x-3 ">
                        <li className="topbar-icon cursor-pointer"><PersonRounded htmlColor="white" className="hover:text-blue-50 " /></li>
                        <li className="topbar-icon cursor-pointer"><MessageRounded htmlColor="white" className="hover:text-blue-50 " /></li>
                        <li className="topbar-icon cursor-pointer"><NotificationsRounded htmlColor="white" className="hover:text-blue-50 " /></li>
                    </ul>

                    <div className="search-btn md:hidden">
                        <button className="">
                            <SearchRounded htmlColor="white" fontSize="large" />
                        </button>
                    </div>

                    <div className="profileImg ">{/*show when user is logged in */}
                        <img src={profileData.profileImg} alt="" className="w-9 h-9 rounded-[50%] object-cover border border-gray-400 cursor-pointer" onClick={() => setShowProPopover(!showProPopover)} />
                        {/* <div className={`topbar-popover absolute right-2 top-[50px] w-36  lg:w-44 transform h-0 overflow-hidden`}> */}
                        <div className={`topbar-profile-popover absolute right-2 top-[50px] w-36  lg:w-44 transition-all duration-1000 overflow-hidden z-10 ${showProPopover ? 'h-fit' : 'h-0'}`}>
                            <ProfilePopover popover={{ showProPopover, setShowProPopover }} />
                        </div>
                        {showProPopover && <span onClick={() => setShowProPopover(!showProPopover)} className="hide-popover-span bg-gray-600 fixed opacity-15 left-0 top-0 w-full h-full z-0"></span>}
                    </div>
                </div>

            </div>
            <div className="w-full h-[50px]"></div>
        </header>

        {/* for small screen -  sidebar */}
        {showSidebar &&
            <Sidebar />
        }

    </>
    )
}
