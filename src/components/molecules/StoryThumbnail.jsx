import React from 'react';
import { motion } from 'framer-motion';

const StoryThumbnail = ({ story, onClick, index, isAddStory = false }) => {
  const commonProps = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: index * 0.1 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    onClick: isAddStory ? onClick : () => onClick(story),
    className: "flex-shrink-0 flex flex-col items-center space-y-2 p-0", // p-0 to override default button padding
  };

  if (isAddStory) {
    return (
      <motion.button {...commonProps}>
        <div className="relative">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus text-gray-400"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          </div>
        </div>
        <span className="text-xs text-gray-400 text-center max-w-[60px] truncate">
          Your Story
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button {...commonProps}>
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
  );
};

export default StoryThumbnail;