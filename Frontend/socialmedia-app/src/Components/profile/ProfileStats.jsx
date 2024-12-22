import { Link } from "react-router-dom";

const StatItem = ({ count = 0, label, link }) => {
    const content = (
        <>
            <p className="font-semibold text-center">{count}</p>
            <p className="text-center text-sm text-gray-500">{label}</p>
        </>
    );

    return link && count > 0 ? (
        <div className={`profile-${label.toLowerCase()}`}>
            <Link to={link}>{content}</Link>
        </div>
    ) : (
        <div className={`profile-${label.toLowerCase()}`}>{content}</div>
    );
};

const ProfileStats = ({ profile }) => {
    return (
        <div className="profile-stats mt-2 py-4 flex justify-center space-x-10">
            <StatItem count={profile.followers_count} label="Followers" link="followers" />
            <StatItem count={profile.followings_count} label="Followings" link="followings" />
            <StatItem count={profile.posts_count} label="Posts" />
        </div>
    )
}

export default ProfileStats;
