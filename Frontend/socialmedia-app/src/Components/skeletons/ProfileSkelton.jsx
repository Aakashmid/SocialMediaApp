import React from 'react';

const ProfileSkeleton = () => {
    return (
        <div className="profile-page-container animate-pulse">
            <div className="profile-wrapper">
                <div className="profile-top">
                    <div className="profileCover relative">
                        <div className="cover-img w-full h-36 bg-gray-200"></div>
                        <div className="profile-img w-28 h-28 rounded-full absolute left-1/2 top-20 bg-gray-200 border-4 border-white -translate-x-1/2"></div>
                        <div className="w-full h-16"></div>
                    </div>
                    <div className="profile-header mt-2 flex items-center gap-2 flex-col">
                        <div className="w-32 h-6 bg-gray-200 rounded "></div>
                        <div className="w-48 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="profile-stats mt-8 flex  gap-10 justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full "></div>
                            <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full "></div>
                            <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full "></div>
                            <div className="w-16 h-6 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="profile-actions mt-12 grid grid-cols-2 lg:w-2/3  gap-5 px-4 mx-auto">
                        <div className=" h-8 bg-gray-200 rounded"></div>
                        <div className=" h-8 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="flex ">
                    <div className="profile-feed mt-5 border-t lg:w-2/3 p-4 grid grid-cols-3 gap-2 lg:grid-cols-4">
                        <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
                        <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
                        <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
                        <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;