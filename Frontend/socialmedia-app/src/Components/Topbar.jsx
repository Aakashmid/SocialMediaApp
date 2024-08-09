import { Link } from "react-router-dom";
import { SearchRounded, AccountCircleRounded, MessageRounded, PersonRounded, NotificationsRounded } from '@mui/icons-material/';

export default function Topbar() {
    return (
        <div className="topbarContainer bg-bgPrimary w-full px-3 md:px-4  xl:px-5 flex items-center justify-between py-2">
            <div className="logo">
                <Link className="text-white font-medium text-2xl" to={'/'}><span>SocialApp</span></Link>
            </div>
            <div className="topbar-center hidden md:flex md:items-center md:space-x-5 xl:space-x-8  ">
                <div className="searchBar bg-white rounded-[30px] px-2  flex items-center md:w-[300px] lg:w-[400px] xl:w-[500px]">
                    <span className="py-1 cursor-pointer px-2">
                        <SearchRounded />
                    </span>
                    <input type="text" className="search-query bg-transparent focus:outline-none px-2 text-[15px] flex-grow py-1" placeholder="Search for friend or post" />
                </div>
                <div className="topbar-links flex space-x-3 text-white">
                    <Link to={'/'} >Homepage</Link>
                    <Link to={'/'} >Timeline</Link>
                </div>
            </div>
            <div className="topbar-right flex items-center space-x-3 lg:space-x-5 ">
                <ul className="topbar-icons hidden md:flex items-center space-x-3 ">
                    <li className="topbar-icon"><PersonRounded htmlColor="white" /></li>
                    <li className="topbar-icon"><MessageRounded htmlColor="white" /></li>
                    <li className="topbar-icon"><NotificationsRounded htmlColor="white" /></li>
                </ul>
                <div className="search-btn md:hidden">
                    <button className="">
                        <SearchRounded htmlColor="white" fontSize="large"/>
                    </button>
                </div>
                <div className="profileImg ">{/*show when user is logged in */}
                    {/* <img src="assets/profileImg" alt="" className="" /> */}
                    <AccountCircleRounded className="" htmlColor="white" fontSize="large" />
                </div>
            </div>

        </div>
    )
}
