import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

function NotificationItem({ notification, onMarkAsRead }) {
  const navigate = useNavigate()
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { icon: 'Heart', color: 'text-red-500' }
      case 'comment':
        return { icon: 'MessageCircle', color: 'text-blue-500' }
      case 'follow':
        return { icon: 'UserPlus', color: 'text-green-500' }
      default:
        return { icon: 'Bell', color: 'text-gray-500' }
    }
  }

  const handleUserClick = () => {
    if (notification.user) {
      navigate(`/profile/${notification.user.id}`)
    }
  }

  const handlePostClick = () => {
    if (notification.post) {
      navigate(`/post/${notification.post.id}`)
    }
  }

  const handleMarkAsRead = (e) => {
    e.stopPropagation()
    if (!notification.isRead) {
      onMarkAsRead(notification.id)
    }
  }

  const { icon, color } = getNotificationIcon(notification.type)
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-xl border transition-all hover:bg-gray-800/30 ${
        notification.isRead 
          ? 'bg-gray-800/20 border-gray-700/50' 
          : 'bg-gray-800/40 border-gray-600'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Notification Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center ${
          !notification.isRead ? 'ring-2 ring-primary/50' : ''
        }`}>
          <ApperIcon name={icon} size={18} className={color} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            {/* User Avatar */}
            {notification.user && (
              <button
                onClick={handleUserClick}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <img
                  src={notification.user.avatar}
                  alt={notification.user.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            )}

            {/* Notification Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300">
                {notification.user && (
                  <button
                    onClick={handleUserClick}
                    className="font-semibold text-white hover:text-primary transition-colors"
                  >
                    {notification.user.displayName}
                  </button>
                )}
                <span className="ml-1">{notification.message}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
            </div>

            {/* Unread Indicator */}
            {!notification.isRead && (
              <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>

          {/* Post Preview */}
          {notification.post && (
            <button
              onClick={handlePostClick}
              className="mt-2 p-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors w-full text-left"
            >
              <div className="flex items-center space-x-3">
                {notification.post.images && notification.post.images[0] && (
                  <img
                    src={notification.post.images[0]}
                    alt="Post"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">
                    {notification.post.caption || 'View post'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.post.likes} likes • {notification.post.comments?.length || 0} comments
                  </p>
                </div>
                <ApperIcon name="ChevronRight" size={16} className="text-gray-500" />
              </div>
            </button>
          )}
        </div>

        {/* Mark as Read Button */}
        {!notification.isRead && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAsRead}
            className="flex-shrink-0 opacity-60 hover:opacity-100"
          >
            <ApperIcon name="Check" size={16} />
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default NotificationItem