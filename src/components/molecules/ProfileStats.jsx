import React from 'react';

const ProfileStats = ({ user }) => {
  return (
    <div className="flex justify-around py-2">
      <div className="text-center">
        <div className="text-xl font-bold text-white">{user.posts?.length || 0}</div>
        <div className="text-gray-400 text-sm">Posts</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-white">{user.followers?.length || 0}</div>
        <div className="text-gray-400 text-sm">Followers</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-white">{user.following?.length || 0}</div>
        <div className="text-gray-400 text-sm">Following</div>
      </div>
    </div>
  );
};

export default ProfileStats;