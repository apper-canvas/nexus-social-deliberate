import React from 'react';
import { motion } from 'framer-motion';
import PostCard from '@/components/organisms/PostCard';
import StoryCarousel from '@/components/organisms/StoryCarousel';

function Feed({ posts, stories, onLike, onComment }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-0"
    >
      {/* Stories Section */}
      {stories.length > 0 && (
        <div className="border-b border-gray-800">
          <StoryCarousel stories={stories} />
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard 
              post={post}
              onLike={onLike}
              onComment={onComment}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Feed;