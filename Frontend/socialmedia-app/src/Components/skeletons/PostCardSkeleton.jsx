import React from 'react';

const PostCardSkeleton = () => {
  return (
    <div className="post-card-skeleton animate-pulse bg-white rounded-lg p-4 border">
      {/* Post Card Top */}
      <div className="post-card-top flex items-center justify-between mb-4">
        <div className="profile flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full">&#8203;</div>
          <div className="space-y-2">
            <div className="w-24 h-3 bg-gray-200 rounded">&#8203;</div>
            <div className="w-24 h-2 bg-gray-200 rounded">&#8203;</div>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full">&#8203;</div>
      </div>

      {/* Card Center */}
      <div className="card-center bg-gray-200 rounded-lg mt-2">
        <div className="w-full h-60 ">&#8203;</div>
      </div>
      {/* Post Card Bottom */}
      <div className="post-card-bottom flex justify-between items-center mt-4">
        <div className="flex space-x-2 items-center">
          <div className="w-6 h-6 bg-gray-200 rounded-full">&#8203;</div>
          <div className="w-6 h-6 bg-gray-200 rounded-full">&#8203;</div>
          <div className="w-32 h-4 bg-gray-200 rounded">&#8203;</div>
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded">&#8203;</div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
