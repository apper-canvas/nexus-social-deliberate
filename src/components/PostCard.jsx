import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from './ApperIcon'
import CommentModal from './CommentModal'

function PostCard({ post, onLike, onComment }) {
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    
    setIsLiking(true)
    setIsLiked(!isLiked)
    
    try {
      await onLike(post.id)
    } catch (err) {
      // Revert on error
      setIsLiked(isLiked)
    } finally {
      setIsLiking(false)
    }
  }

  const handleComment = async (text) => {
    await onComment(post.id, text)
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-background border-b border-gray-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <img 
              src={post.user?.avatar || '/default-avatar.png'} 
              alt={post.user?.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-white text-sm">{post.user?.displayName}</p>
              <p className="text-gray-400 text-xs">@{post.user?.username}</p>
            </div>
          </div>
          
          <button className="p-1 hover:bg-surface rounded-full transition-colors">
            <ApperIcon name="MoreVertical" size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Image */}
        <div className="relative">
          <img 
            src={post.imageUrl} 
            alt="Post"
            className="w-full aspect-square object-cover"
            loading="lazy"
          />
          
          {/* Double-tap to like overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              key={isLiked ? 'liked' : 'unliked'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isLiked ? [0, 1, 0] : 0, scale: isLiked ? [0, 1.3, 0] : 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <ApperIcon name="Heart" size={80} className="drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                disabled={isLiking}
                className="flex items-center space-x-1 group"
              >
                <motion.div
                  animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ApperIcon 
                    name="Heart" 
                    size={24} 
                    className={`transition-colors ${
                      isLiked 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-300 group-hover:text-gray-100'
                    }`}
                  />
                </motion.div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowComments(true)}
                className="text-gray-300 hover:text-gray-100 transition-colors"
              >
                <ApperIcon name="MessageCircle" size={24} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-gray-100 transition-colors"
              >
                <ApperIcon name="Send" size={24} />
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-gray-100 transition-colors"
            >
              <ApperIcon name="Bookmark" size={24} />
            </motion.button>
          </div>

          {/* Likes count */}
          <div className="text-white font-semibold text-sm">
            {post.likes?.toLocaleString() || 0} likes
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="text-white text-sm">
              <span className="font-semibold">{post.user?.username}</span>{' '}
              <span>{post.caption}</span>
            </div>
          )}

          {/* Comments preview */}
          {post.comments && post.comments.length > 0 && (
            <button
              onClick={() => setShowComments(true)}
              className="text-gray-400 text-sm hover:text-gray-300 transition-colors"
            >
              View all {post.comments.length} comments
            </button>
          )}

          {/* Timestamp */}
          <div className="text-gray-500 text-xs uppercase">
            {timeAgo}
          </div>
        </div>
      </motion.div>

      {/* Comments Modal */}
      <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={post}
        onComment={handleComment}
      />
    </>
  )
}

export default PostCard