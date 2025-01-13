import { Link } from "react-router-dom"

export default function Rightbar() {
  const OnlineFollowing = ({ User }) => {
    return (
      <li className="my-1 p-1">
        <Link to={'/profile'} className="flex  space-x-4 items-center">
          <div className="relative">
            <div className="absolute top-0 right-0 w-[10px] h-[10px] bg-green-500 rounded-[50%] outline outline-white"></div>
            <img src="/images/person/1.jpeg" className="w-9 h-9 object-cover rounded-[50%]" alt="" />
          </div>
          <span className="font-semibold">{User.username}</span>
        </Link>
      </li>
    )
  }
  return (
    <div className="rightbar-wrapper py-5 pr-5">
      <div className="info flex items-center space-x-4">
        <img src="/images/gift.png" className="w-10 h-auto " alt="" /> <h2 className=""><strong>Aakash</strong> and <strong>3 other friends </strong> has birthday today</h2>
      </div>
      <div className="my-5"><img src="/images/group.png" className="w-full object-cover rounded-lg h-auto" alt="" /></div>
      <div className="online-followings">
        <h2 className="font-bold text-lg">Online Followings</h2>
        <ul className="py-4 ">
          <OnlineFollowing key={1} User={{ username: 'Aakash' }} />
          <OnlineFollowing key={2} User={{ username: 'Aakash' }} />
          <OnlineFollowing key={3} User={{ username: 'Aakash' }} />
        </ul>
      </div>
    </div>
  )
}
