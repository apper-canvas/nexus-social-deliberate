import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const UserCard = ({ user, onFollow, index }) => {
  return (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-surface rounded-xl p-4 flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        <img 
          src={user.avatar} 
          alt={user.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-white">{user.displayName}</h3>
          <p className="text-gray-400 text-sm">@{user.username}</p>
          <p className="text-gray-500 text-xs">{user.followers.length} followers</p>
        </div>
      </div>
      
      <Button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onFollow(user.id)}
        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all p-0 ${ // p-0 to override default button padding
          user.isFollowing
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
        }`}
      >
        {user.isFollowing ? 'Following' : 'Follow'}
      </Button>
    </motion.div>
  );
};

export default UserCard;