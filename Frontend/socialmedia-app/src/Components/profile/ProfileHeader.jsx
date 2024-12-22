const ProfileHeader = ({ profile, isCUProfile, handleFollow }) => {
    return (
        <div className="profileInfo">
            <p className={`flex justify-center ${!isCUProfile && 'space-x-4 items-center'}`}>
                <span className="profile-Name text-xl font-semibold">{profile.username}</span>
                {!isCUProfile && (
                    <button
                        onClick={() => handleFollow(profile.id)}
                        className='follow-unfollow-btn rounded text-sm px-1 py-[2px] bg-gray-700 text-white'
                    >
                        {profile.isFollowed ? "Following" : "Follow"}
                    </button>
                )}
            </p>
            <p className="profile-bio mt-2 text-center">{profile.bio}</p>
        </div>
    )
}
export default ProfileHeader;
