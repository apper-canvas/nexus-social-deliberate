import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentItem = ({ comment }) => {
  return (
    <div className="flex space-x-3">
      <img 
        src={comment.user?.avatar || '/default-avatar.png'}
        alt={comment.user?.username}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start space-x-2">
          <span className="font-semibold text-white text-sm">
            {comment.user?.username}
          </span>
          <span className="text-gray-300 text-sm break-words">
            {comment.text}
          </span>
        </div>
        <div className="flex items-center space-x-4 mt-1">
          <span className="text-gray-500 text-xs">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
          <button className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
            Reply
          </button>
          <button className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;