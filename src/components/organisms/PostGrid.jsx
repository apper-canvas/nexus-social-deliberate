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
    <div className="grid grid-cols-3 gap-1">
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