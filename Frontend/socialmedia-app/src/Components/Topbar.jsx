import { Link } from "react-router-dom";
import { SearchRounded, AccountCircleRounded, MessageRounded, PersonRounded, NotificationsRounded } from '@mui/icons-material/';
import { useContext } from "react";
import { ProfileContext } from "./context";

export default function Topbar() {
    const profile = useContext(ProfileContext)
    return (
        <header>
            <div className="topbarContainer bg-bgPrimary w-full px-3 md:px-4  xl:px-5 flex items-center justify-between py-2 ">
                <div className="logo">
                    <Link className="text-white font-medium text-2xl" to={'/'}><span>Buzzline</span></Link>
                </div>
                <div className="topbar-center hidden md:flex md:items-center md:space-x-4 xl:space-x-6  ">
                    <div className="searchBar bg-white rounded-[30px] px-2  flex items-center md:w-[300px] lg:w-[400px] xl:w-[500px]">
                        {/* search bar form */}
                        <form action="#">
                            <span className="py-1 cursor-pointer px-2">
                                <SearchRounded />
                            </span>
                            <input type="text" name="query" className="search-query bg-transparent focus:outline-none px-2 text-sm flex-grow py-[6px]" placeholder="Search for friend or post" />
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
                        <img src={profile.profileImg} alt="" className="w-9 h-9 rounded-[50%] object-cover border" />
                    </div>
                </div>

            </div>
        </header>
    )
}
