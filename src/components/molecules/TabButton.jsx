import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TabButton = ({ label, iconName, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all p-0 ${ // p-0 to override default button padding
        isActive
          ? 'bg-gradient-to-r from-primary to-secondary text-white'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <div className="flex items-center justify-center space-x-2">
        <ApperIcon name={iconName} size={16} />
        <span className="capitalize">{label}</span>
      </div>
    </Button>
  );
};

export default TabButton;