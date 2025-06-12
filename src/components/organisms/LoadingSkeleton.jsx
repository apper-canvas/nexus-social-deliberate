import React from 'react';
import { motion } from 'framer-motion';

function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="space-y-0">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-background border-b border-gray-800"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 p-4">
            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-700 rounded w-1/4 animate-pulse"></div>
              <div className="h-2 bg-gray-700 rounded w-1/6 animate-pulse"></div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full aspect-square bg-gray-700 animate-pulse"></div>

          {/* Actions */}
          <div className="p-4 space-y-3">
            <div className="flex space-x-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-3 bg-gray-700 rounded w-1/4 animate-pulse"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;