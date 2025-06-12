import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

function PostGrid({ posts = [] }) {
  const handlePostClick = (post) => {
    // In a real app, this would open the post detail view
    console.log('Open post:', post)
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post, index) => (
        <motion.button
          key={post.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePostClick(post)}
          className="relative aspect-square group"
        >
          <img 
            src={post.imageUrl}
            alt="Post"
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Heart" size={16} />
                <span className="text-sm font-medium">{post.likes || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="MessageCircle" size={16} />
                <span className="text-sm font-medium">{post.comments?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Multiple images indicator */}
          {post.isCarousel && (
            <div className="absolute top-2 right-2">
              <ApperIcon name="Copy" size={16} className="text-white drop-shadow-lg" />
            </div>
          )}

          {/* Video indicator */}
          {post.isVideo && (
            <div className="absolute top-2 left-2">
              <ApperIcon name="Play" size={16} className="text-white drop-shadow-lg" />
            </div>
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default PostGrid