import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfilePopover from "../Topbar/ProfilePopover";
import { SearchRounded, MessageRounded, PersonRounded, NotificationsRounded, Person, PersonOutline, ExitToApp, Close } from '@mui/icons-material/';
import { useContext, useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import SearchInputForm1 from "../Topbar/SearchInputForm1";
import SearchInputForm2 from "../Topbar/SearchInputForm2";
import Logo from "../Logo";
import { Skeleton } from "@mui/material";
import { FALLBACK_PROFILE_IMG } from "../constants";


export default function Topbar() {
    const [showProPopover, setShowProPopover] = useState(false);    // profpopover - profile popover 
    const [showSidebar, setShowSidebar] = useState(false);
    const [showChatBar, setShowChatBar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);   // for tracking profile image loading

    const [isClickable, setIsClickable] = useState(false);
    const { profileData } = useContext(ProfileDataContext);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search/?query=' + e.target.query.value);
    }


    useEffect(() => {

        if (showSidebar) {
            document.body.style.overflow = showSidebar ? 'hidden' : 'auto';
        }
        else if (showProPopover) {
            document.body.style.overflow = showProPopover ? 'hidden' : 'auto';
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showProPopover, showSidebar])


    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname.includes('search')) {
            setShowSearch(true);
        }
        else{
            setShowSearch(false);
        }
    }, [pathname])

    return (<>

        <div className="topbarContainer z-30 fixed bg-bgPrimary w-full px-3 md:px-4  xl:px-5 flex items-center justify-between py-2 ">
            <div className='flex items-center topbar-left'>
                <div className="md:hidden mr-2">
                    {showSidebar ? <span className="w-fit cursor-pointer " onClick={() => setShowSidebar(!showSidebar)}><Close htmlColor="white" /></span>
                        : <span className="w-fit cursor-pointer " onClick={() => setShowSidebar(!showSidebar)}><MenuIcon htmlColor="white" /></span>
                    }
                </div>
                {/* <Link className="Logo text-white font-medium text-2xl" to={'/'}><span>Buzzline</span></Link> */}
                <Link className="Logo text-white font-medium text-2xl" to={'/'}><Logo bg="white" /></Link>
            </div>
            <div className="topbar-center hidden md:flex md:items-center md:space-x-4 xl:space-x-6  ">
                <SearchInputForm1 onSearchFormSubmit={handleSearch} />
                <div className="topbar-links flex space-x-3 text-white">
                    <Link to={'/'} >Homepage</Link>
                    <Link to={'/'} >Timeline</Link>
                </div>
            </div>
            <div className="topbar-right flex items-center space-x-3 lg:space-x-5 ">
                <ul className="topbar-icons hidden md:flex items-center gap-1 lg:space-x-2 ">
                    {/* <li className="topbar-icon cursor-pointer"><PersonRounded htmlColor="white" className="hover:text-blue-50 " /></li> */}
                    <li className="topbar-icon cursor-pointer p-1 hover:bg-gray-600 rounded-full" onClick={() => navigate('/chat')}><MessageRounded htmlColor="white" className="hover:text-blue-50 " /></li>
                    <li className="topbar-icon cursor-pointer p-1 hover:bg-gray-600 rounded-full"><NotificationsRounded htmlColor="white" className="hover:text-blue-50 " /></li>
                </ul>

                <div className="search-bar flex  space-x-2 md:hidden">

                    {showSearch &&
                        <div className="search-bar-small-screen top-0 left-0 fixed w-full h-fit md:hidden">
                            <SearchInputForm2 onSearchFormSubmit={handleSearch} close={() => setShowSearch(!showSearch)} />
                        </div>
                    }

                    <button onClick={() => setShowSearch(!showSearch)}>
                        <SearchRounded className="active:text-gray-200" htmlColor="white" fontSize="large" />
                    </button>
                </div>

                <div className="profileImg ">{/*show when user is logged in */}
                    {!imgLoaded &&
                        <Skeleton variant="circular" sx={{ bgcolor: 'gray.500' }} width={36} height={36} />
                    }
                    {profileData.profileImg && (
                        <img src={profileData.profileImg} alt="" onLoad={() => setImgLoaded(true)}
                            onError={(e) =>e.target.src = FALLBACK_PROFILE_IMG } className={`${!imgLoaded && 'hidden'} w-9 h-9 rounded-[50%] object-cover border border-gray-400 cursor-pointer`} onClick={() => setShowProPopover(!showProPopover)} />
                    )}

                    <div className={`topbar-profile-popover absolute right-2 top-[50px] w-36  lg:w-44 transition-all duration-1000 overflow-hidden z-10 ${showProPopover ? 'h-fit' : 'h-0'}`}>
                        <ProfilePopover popover={{ showProPopover, setShowProPopover }} />
                    </div>
                    {showProPopover && <span onClick={() => setShowProPopover(!showProPopover)} className="hide-popover-span bg-gray-600 fixed opacity-15 left-0 top-0 w-full h-full z-0"></span>}
                </div>
            </div>

        </div>

        <div className="w-full h-[3.2rem]"></div>


        {/* for small screen -  sidebar */}
        {/* <div className="lg:hidden ">
            {showSidebar &&
                <>
                    <Sidebar />
                    <span className="hide-sidebar-bg bg-gray-600 fixed opacity-15 left-0 top-0 w-full h-full z-0" onClick={() => setShowSidebar(!showSidebar)}></span>
                </>
            }
        </div> */}

        <div className="md:hidden">
            <div className={`fixed top-[3.25rem] left-0 w-[70%] sm:w-1/2 md:w-[40%] transform transition-all duration-300 z-30 ${showSidebar ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <Sidebar closeSidebar={() => setShowSidebar(!showSidebar)} />
            </div>
            {showSidebar && (
                <span
                    className="hide-sidebar-bg bg-gray-600 fixed opacity-15 left-0 top-0 w-full h-full z-20"
                    onClick={() => setShowSidebar(!showSidebar)}
                ></span>
            )}
        </div>




    </>
    )
}
