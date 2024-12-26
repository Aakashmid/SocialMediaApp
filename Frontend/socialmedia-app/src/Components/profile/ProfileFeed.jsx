import React from 'react';
import ProfilePosts from './ProfilePosts';


const ProfileFeed = ({
    feedOP,
    setFeedOp,
    loading,
    handleOnclickPost,
    isCUProfile,
}) => {

    const Underline = () => (
        <span className="absolute h-[2px] bg-black w-10/12 -bottom-1 left-1/2 -translate-x-1/2"></span>
    );

    return (
        <div className="profile-center lg:w-2/3">
            <div className="profile-feed-contaier px-4 pt-2 pb-1">
                <div className="border-b flex justify-around py-1">
                    <button
                        className={`text-lg px-6 relative ${feedOP === 'posts' && 'font-semibold'}`}
                        onClick={() => setFeedOp('posts')}
                    >
                        Posts {feedOP === 'posts' && <Underline />}
                    </button>
                    <button
                        className={`text-lg px-6 relative ${feedOP === 'videos' && 'font-semibold'}`}
                        onClick={() => setFeedOp('videos')}
                    >
                        Videos {feedOP === 'videos' && <Underline />}
                    </button>
                    {isCUProfile &&
                        <button
                            className={`text-lg px-6 relative ${feedOP === 'saved' && 'font-semibold'}`}
                            onClick={() => setFeedOp('saved')}
                        >
                            Saved {feedOP === 'saved' && <Underline />}
                        </button>
                    }
                </div>
            </div>
            <div className="profile-feed">
                {(feedOP === 'posts' || feedOP === 'saved') && (
                    <ProfilePosts
                        loading={loading}
                        // posts={profilePosts}
                        onclickPost={handleOnclickPost}
                    />
                )}
                {/* {feedOP === 'saved' && (
                    <ProfilePosts
                        loading={loading}
                        posts={savedPosts}
                        onclickPost={handleOnclickPost}
                    />
                )} */}
            </div>
        </div>
    );
};

export default ProfileFeed;
