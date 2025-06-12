import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

function EmptyState({ title, description, actionLabel, onAction, icon = "Image" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 space-y-4 max-w-sm mx-auto"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
        className="mx-auto w-16 h-16 bg-surface rounded-full flex items-center justify-center"
      >
        <ApperIcon name={icon} size={32} className="text-gray-400" />
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

export default EmptyState;