import React from 'react';
import StoryThumbnail from '@/components/molecules/StoryThumbnail';

function StoryCarousel({ stories = [] }) {
  const handleStoryClick = (story) => {
    // In a real app, this would open the story viewer
    console.log('Open story:', story);
  };

  const handleAddStoryClick = () => {
    console.log('Add new story');
    // Logic for adding a new story
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <StoryThumbnail isAddStory={true} onClick={handleAddStoryClick} index={-1} /> {/* index -1 to not interfere with other delays */}

        {/* Stories */}
        {stories.map((story, index) => (
          <StoryThumbnail 
            key={story.id} 
            story={story} 
            onClick={handleStoryClick} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}

export default StoryCarousel;