import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  const [isFocused, setIsFocused] = useState(false)
  const [debouncedValue, setDebouncedValue] = useState(value)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedValue !== value) {
        onChange(debouncedValue)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [debouncedValue, onChange, value])

  const handleClear = () => {
    setDebouncedValue('')
    onChange('')
  }

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
        
        <input
          type="text"
          value={debouncedValue}
          onChange={(e) => setDebouncedValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        
        {debouncedValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="p-1 hover:bg-gray-600 rounded-full transition-colors"
          >
            <ApperIcon name="X" size={16} className="text-gray-400" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default SearchBar