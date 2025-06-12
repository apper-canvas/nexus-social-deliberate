import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import CreatePostForm from '@/components/organisms/CreatePostForm';
import Button from '@/components/atoms/Button';
import postService from '@/services/api/postService'; // Keep API service import here as it's page-level logic

function CreatePostPage() {
  const navigate = useNavigate();

  const handlePostSubmit = async (postData) => {
    // This is where the actual API call happens,
    // separated from the form's internal state management.
    await postService.create(postData);
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 p-4 max-w-md mx-auto"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-white">Create Post</h1>
        <Button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-surface rounded-lg transition-colors"
        >
          <ApperIcon name="X" size={20} className="text-gray-400" />
        </Button>
      </div>

      <CreatePostForm onPostSubmit={handlePostSubmit} />
    </motion.div>
  );
}

export default CreatePostPage;