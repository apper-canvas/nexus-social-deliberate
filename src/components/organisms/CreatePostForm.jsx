import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import ImageUploader from '@/components/molecules/ImageUploader';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const CreatePostForm = ({ onPostSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size must be less than 10MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!selectedImage) {
      toast.error('Please select an image');
      return;
    }

    if (!caption.trim()) {
      toast.error('Please add a caption');
      return;
    }

    setIsUploading(true);
    try {
      await onPostSubmit({
        imageUrl: imagePreview, // In real app, this would be uploaded to a CDN
        caption: caption.trim(),
      });
      setSelectedImage(null);
      setImagePreview(null);
      setCaption('');
      toast.success('Post created successfully!');
    } catch (err) {
      toast.error('Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Area */}
      <ImageUploader
        imagePreview={imagePreview}
        onImageSelect={handleImageSelect}
        onRemoveImage={handleRemoveImage}
      />

      {/* Caption Input */}
      <div className="space-y-2">
        <label htmlFor="caption" className="block text-sm font-medium text-gray-300">
          Caption
        </label>
        <Input
          type="textarea"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          rows={4}
          maxLength={500}
          className="resize-none"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{caption.length}/500</span>
        </div>
      </div>

      {/* Filters Section (Placeholder, not functional) */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Filters</h3>
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {['None', 'Vintage', 'B&W', 'Bright', 'Warm'].map((filter) => (
            <Button
              key={filter}
              className="flex-shrink-0 px-4 py-2 bg-surface hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Post Button */}
      <Button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePost}
        disabled={!selectedImage || !caption.trim() || isUploading}
        className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isUploading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Posting...</span>
          </div>
        ) : (
          'Share Post'
        )}
      </Button>
    </div>
  );
};

export default CreatePostForm;