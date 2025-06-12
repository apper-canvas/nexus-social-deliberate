import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

function StoryCarousel({ stories = [] }) {
  const handleStoryClick = (story) => {
    // In a real app, this would open the story viewer
    console.log('Open story:', story)
  }

  return (
    <div className="p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 flex flex-col items-center space-y-2"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
              <ApperIcon name="Plus" size={20} className="text-gray-400" />
            </div>
          </div>
          <span className="text-xs text-gray-400 text-center max-w-[60px] truncate">
            Your Story
          </span>
        </motion.button>

        {/* Stories */}
        {stories.map((story, index) => (
          <motion.button
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStoryClick(story)}
            className="flex-shrink-0 flex flex-col items-center space-y-2"
          >
            <div className="relative">
              {/* Gradient Ring for Unviewed Stories */}
              <div className="gradient-ring p-[2px] rounded-full">
                <img 
                  src={story.imageUrl} 
                  alt={story.user?.username || 'Story'}
                  className="w-16 h-16 rounded-full object-cover bg-surface"
                />
              </div>
              
              {/* Online Indicator */}
              {story.user?.isOnline && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
              )}
            </div>
            <span className="text-xs text-gray-300 text-center max-w-[60px] truncate">
              {story.user?.username || 'User'}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default StoryCarousel