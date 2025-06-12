import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  const [isFocused, setIsFocused] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Update internal debouncedValue when external value prop changes
  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedValue !== value) {
        onChange(debouncedValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedValue, onChange, value]);

  const handleClear = () => {
    setDebouncedValue('');
    onChange('');
  };

  return (
    <motion.div
      animate={{
        scale: isFocused ? 1.02 : 1
      }}
      className="relative"
    >
      <div className={`flex items-center space-x-3 p-3 bg-surface rounded-xl border-2 transition-all ${
        isFocused 
          ? 'border-primary/50 shadow-lg shadow-primary/10' 
          : 'border-transparent'
      }`}>
        <ApperIcon 
          name="Search" 
          size={20} 
          className={`transition-colors ${
            isFocused ? 'text-primary' : 'text-gray-400'
          }`} 
        />
        
        <Input
          type="text"
          value={debouncedValue}
          onChange={(e) => setDebouncedValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="bg-transparent focus:outline-none p-0 focus:ring-0 focus:border-0" // Override Input atom's padding
        />
        
        <AnimatePresence>
          {debouncedValue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                onClick={handleClear}
                className="p-1 hover:bg-gray-600 rounded-full transition-colors"
              >
                <ApperIcon name="X" size={16} className="text-gray-400" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default SearchBar;