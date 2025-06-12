import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ActionIconButton = ({ iconName, size = 20, className, onClick, ...motionProps }) => {
  return (
    <Button
      onClick={onClick}
      className={`p-2 bg-surface hover:bg-gray-600 rounded-lg transition-colors ${className || ''}`}
      {...motionProps}
    >
      <ApperIcon name={iconName} size={size} className="text-white" />
    </Button>
  );
};

export default ActionIconButton;