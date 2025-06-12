import React from 'react';
import { motion } from 'framer-motion';
import ProfileStats from '@/components/molecules/ProfileStats';
import ProfileActions from '@/components/molecules/ProfileActions';

function ProfileHeader({ user, isCurrentUser, onFollow, onEdit }) {
  if (!user) return null;

  return (
    <div className="p-4 space-y-4">
      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img 
            src={user.avatar || '/default-avatar.png'}
            alt={user.username}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
          />
          {user.isOnline && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 space-y-1">
          <h1 className="text-xl font-bold text-white">{user.displayName}</h1>
          <p className="text-gray-400">@{user.username}</p>
          {user.bio && (
            <p className="text-gray-300 text-sm">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <ProfileStats user={user} />

      {/* Action Buttons */}
      <ProfileActions 
        user={user} 
        isCurrentUser={isCurrentUser} 
        onFollow={onFollow} 
        onEdit={onEdit} 
      />
    </div>
  );
}

export default ProfileHeader;