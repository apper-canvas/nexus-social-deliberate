import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

function ProfileHeader({ user, isCurrentUser, onFollow, onEdit }) {
  if (!user) return null

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

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {isCurrentUser ? (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEdit}
              className="flex-1 py-2 bg-surface hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-surface hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ApperIcon name="Settings" size={20} className="text-white" />
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
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
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-surface hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ApperIcon name="MessageCircle" size={20} className="text-white" />
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfileHeader