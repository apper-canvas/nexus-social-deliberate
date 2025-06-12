import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CommentItem from '@/components/molecules/CommentItem';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

function CommentModal({ isOpen, onClose, post, onComment }) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onComment(post.id, newComment.trim()); // Pass post.id along with comment text
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-xl shadow-xl z-50 flex flex-col max-w-md mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white">Comments</h2>
              <Button
                onClick={onClose}
                className="p-1 hover:bg-surface rounded-full transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-400" />
              </Button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <ApperIcon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No comments yet</p>
                  <p className="text-sm">Be the first to comment</p>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
              <div className="flex space-x-3">
                <img 
                  src="/default-avatar.png"
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <Input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="bg-transparent focus:outline-none focus:ring-0 focus:border-0 p-0"
                    maxLength={500}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="text-primary hover:text-secondary disabled:text-gray-500 disabled:cursor-not-allowed font-semibold text-sm transition-colors p-0"
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommentModal;