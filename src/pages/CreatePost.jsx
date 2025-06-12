import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'
import postService from '../services/api/postService'

function CreatePost() {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size must be less than 10MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      setSelectedImage(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePost = async () => {
    if (!selectedImage) {
      toast.error('Please select an image')
      return
    }

    if (!caption.trim()) {
      toast.error('Please add a caption')
      return
    }

    setIsUploading(true)
    try {
      // Simulate file upload and post creation
      const postData = {
        imageUrl: imagePreview, // In real app, this would be uploaded to a CDN
        caption: caption.trim(),
        userId: 'current-user'
      }
      
      await postService.create(postData)
      toast.success('Post created successfully!')
      navigate('/')
    } catch (err) {
      toast.error('Failed to create post')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20 p-4 max-w-md mx-auto"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-white">Create Post</h1>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Image Upload Area */}
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
                onChange={handleImageSelect}
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
              <button
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <ApperIcon name="X" size={16} className="text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Caption Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows={4}
            maxLength={500}
            className="w-full p-4 bg-surface border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{caption.length}/500</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">Filters</h3>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {['None', 'Vintage', 'B&W', 'Bright', 'Warm'].map((filter) => (
              <button
                key={filter}
                className="flex-shrink-0 px-4 py-2 bg-surface hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Post Button */}
        <motion.button
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
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CreatePost