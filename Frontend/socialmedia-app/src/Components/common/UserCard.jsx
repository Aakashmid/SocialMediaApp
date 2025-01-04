import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileDataContext } from "../../Contexts/ProfileContext";
import { followUser, unfollowUser } from "../../services/apiService";

// card showing user detail
const UserCard = ({ user, setData }) => {
    const navigate = useNavigate();
    const { profileData, setProfileData } = useContext(ProfileDataContext);

    const handelFollowUnfollow = async (user) => {
        try {
            var followBtn = document.getElementById(`followBtn${user.id}`);
            if (user.isFollowed) {
                const response = await unfollowUser(user.id);
                setProfileData({ ...profileData, followers_count: profileData.followers_count - 1, isFollowed: false })
                setData((prevData) => {
                    const userExists = prevData.some(item => item.id === user.id);
                    if (!userExists) return prevData;

                    return prevData.map(item =>
                        item.id === user.id ? { ...item, isFollowed: false } : item
                    );
                });
                // followBtn.innerText='Follow';
                console.log('unfollowed user')
            } else {
                const response = await followUser(user.id);
                setProfileData({ ...profileData, followers_count: profileData.followers_count + 1, isFollowed: true })

                setData((prevData) => {
                    const userExists = prevData.some(item => item.id === user.id);
                    if (!userExists) return prevData;

                    return prevData.map(item =>
                        item.id === user.id ? { ...item, isFollowed: true } : item
                    );
                });
                // followBtn.innerText='Following';
                console.log('following user');
            }
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <>
            <div className='flex px-2 py-2 items-center justify-between'>
                <div className="flex items-center space-x-4" onClick={() => navigate(`/profile/${user.username}`, { state: { userId: user.id } })}>
                    <img src={user.profileImg} className='w-10 h-10 rounded-[50%] object-cover border border-gray-400 cursor-pointer' alt="..." />
                    <div className="flex-col items-center space-y-0">
                        <h4 className='username font-medium text-lg'>{user.username}</h4>
                        {user.bio?.length > 0 &&
                            <p className='text-gray-500 text-sm'>{user.bio}</p>
                        }
                    </div>

                </div>
                {user.id !== profileData.id &&
                    <div className="card-button">
                        {/* <button id={`followBtn${user.id}`} onClick={() => handelFollowUnfollow(user, str)} className='bg-bg1  text-white px-3 py-1 md:py-[6px] lg:py-[] rounded-md font-medium cursor-pointer'>{user.isFollowed ? "Following" : "Follow"}</button> */}
                        <button id={`followBtn${user.id}`} onClick={() => handelFollowUnfollow(user)} className='bg-bg1  text-white px-3 py-1 md:py-[6px] lg:py-[] rounded-md font-medium cursor-pointer'>{user.isFollowed ? "Following" : "Follow"}</button>
                    </div>
                }
            </div>
        </>
    )
}


export default UserCard;