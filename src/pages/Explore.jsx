import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ExploreGrid from '../components/ExploreGrid'
import SearchBar from '../components/SearchBar'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import postService from '../services/api/postService'
import userService from '../services/api/userService'
import ApperIcon from '../components/ApperIcon'

function Explore() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('posts')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      if (activeTab === 'posts') {
        const data = await postService.getTrending()
        setPosts(data)
      } else {
        const data = await userService.getSuggested()
        setUsers(data)
      }
    } catch (err) {
      setError(err.message || 'Failed to load explore data')
      toast.error('Failed to load explore data')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (!query.trim()) {
      loadData()
      return
    }

    setLoading(true)
    setError(null)
    try {
      if (activeTab === 'posts') {
        const data = await postService.search(query)
        setPosts(data)
      } else {
        const data = await userService.search(query)
        setUsers(data)
      }
    } catch (err) {
      setError(err.message || 'Search failed')
      toast.error('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchQuery('')
  }

  const handleFollow = async (userId) => {
    try {
      await userService.follow(userId)
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      ))
      toast.success('User followed!')
    } catch (err) {
      toast.error('Failed to follow user')
    }
  }

  useEffect(() => {
    loadData()
  }, [activeTab])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-gray-800 z-30">
        <div className="p-4 space-y-4">
          <SearchBar 
            value={searchQuery}
            onChange={handleSearch}
            placeholder={`Search ${activeTab}...`}
          />
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-surface rounded-lg p-1">
            {['posts', 'people'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <ApperIcon 
                    name={tab === 'posts' ? 'Grid3X3' : 'Users'} 
                    size={16} 
                  />
                  <span className="capitalize">{tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorState 
            message={error}
            onRetry={loadData}
          />
        ) : activeTab === 'posts' ? (
          posts.length === 0 ? (
            <EmptyState 
              title="No posts found"
              description={searchQuery ? "Try a different search term" : "No trending posts available"}
              actionLabel="Clear Search"
              onAction={() => handleSearch('')}
            />
          ) : (
            <ExploreGrid posts={posts} />
          )
        ) : (
          <div className="space-y-4">
            {users.length === 0 ? (
              <EmptyState 
                title="No users found"
                description={searchQuery ? "Try a different search term" : "No suggested users available"}
                actionLabel="Clear Search"
                onAction={() => handleSearch('')}
              />
            ) : (
              users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.avatar} 
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{user.displayName}</h3>
                      <p className="text-gray-400 text-sm">@{user.username}</p>
                      <p className="text-gray-500 text-xs">{user.followers.length} followers</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFollow(user.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      user.isFollowing
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                    }`}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Explore