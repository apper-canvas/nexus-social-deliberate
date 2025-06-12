import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ProfileActions = ({ user, isCurrentUser, onFollow, onEdit }) => {
  return (
    <div className="flex space-x-3">
      {isCurrentUser ? (
        <>
          <Button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onEdit}
            className="flex-1 py-2 bg-surface hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            Edit Profile
          </Button>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-surface hover:bg-gray-600 rounded-lg transition-colors"
          >
            <ApperIcon name="Settings" size={20} className="text-white" />
          </Button>
        </>
      ) : (
        <>
          <Button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onFollow}
            className={`flex-1 py-2 font-medium rounded-lg transition-all ${
              user.isFollowing
                ? 'bg-surface hover:bg-gray-600 text-white'
                : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
            }`}
          >
            {user.isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-surface hover:bg-gray-600 rounded-lg transition-colors"
          >
            <ApperIcon name="MessageCircle" size={20} className="text-white" />
          </Button>
        </>
      )}
    </div>
  );
};

export default ProfileActions;