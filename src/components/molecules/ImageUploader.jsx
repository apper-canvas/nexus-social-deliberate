import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ImageUploader = ({ imagePreview, onImageSelect, onRemoveImage }) => {
  return (
    <div className="space-y-4">
      {!imagePreview ? (
        <motion.label
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full aspect-square border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-primary transition-colors"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-400">
            <ApperIcon name="ImagePlus" size={48} />
            <div className="text-center">
              <p className="font-medium">Add a photo</p>
              <p className="text-sm">Tap to select from gallery</p>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={onImageSelect}
            className="hidden"
          />
        </motion.label>
      ) : (
        <div className="relative">
          <img 
            src={imagePreview}
            alt="Preview"
            className="w-full aspect-square object-cover rounded-xl"
          />
          <Button
            onClick={onRemoveImage}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="X" size={16} className="text-white" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;