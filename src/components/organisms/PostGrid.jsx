import React from 'react';
import { motion } from 'framer-motion';
import PostThumbnail from '@/components/molecules/PostThumbnail';

function PostGrid({ posts = [], onPostClick }) {
  // onPostClick is passed down to PostThumbnail
  const handlePostClick = (post) => {
    // In a real app, this would open the post detail view
    console.log('Open post:', post);
    if (onPostClick) {
      onPostClick(post);
    }
  };

return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2 md:gap-3">
      {posts.map((post, index) => (
        <PostThumbnail 
          key={post.id}
          post={post}
          onClick={handlePostClick}
          index={index}
        />
      ))}
    </div>
  );
}

export default PostGrid;