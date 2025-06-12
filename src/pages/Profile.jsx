import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import PostGrid from '../components/PostGrid'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import userService from '../services/api/userService'
import postService from '../services/api/postService'
import ApperIcon from '../components/ApperIcon'

function Profile() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isCurrentUser, setIsCurrentUser] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const currentUserId = 'current-user' // In real app, get from auth
      const targetUserId = userId || currentUserId
      setIsCurrentUser(targetUserId === currentUserId)
      
      const [userData, userPosts] = await Promise.all([
        userService.getById(targetUserId),
        postService.getByUser(targetUserId)
      ])
      
      setUser(userData)
      setPosts(userPosts)
    } catch (err) {
      setError(err.message || 'Failed to load profile')
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    if (!user) return
    
    try {
      const updatedUser = await userService.follow(user.id)
      setUser(updatedUser)
      toast.success(`${updatedUser.isFollowing ? 'Followed' : 'Unfollowed'} ${user.displayName}`)
    } catch (err) {
      toast.error('Failed to update follow status')
    }
  }

  const handleEditProfile = () => {
    // Navigate to edit profile page
    navigate('/profile/edit')
  }

  useEffect(() => {
    loadData()
  }, [userId])

  if (loading) {
    return (
      <div className="pb-20">
        <div className="p-4 space-y-6">
          {/* Profile header skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
          
          {/* Stats skeleton */}
          <div className="flex justify-around">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="h-4 bg-gray-700 rounded w-8 mx-auto animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded w-12 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        
        <LoadingSkeleton count={6} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <ErrorState 
          message={error}
          onRetry={loadData}
        />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <EmptyState 
          title="User not found"
          description="This user doesn't exist or has been removed"
          actionLabel="Go Back"
          onAction={() => navigate(-1)}
        />
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Profile Header */}
      <ProfileHeader 
        user={user}
        isCurrentUser={isCurrentUser}
        onFollow={handleFollow}
        onEdit={handleEditProfile}
      />

      {/* Posts Section */}
      <div className="border-t border-gray-800">
        {/* Section Header */}
        <div className="flex items-center justify-center py-4 border-b border-gray-800">
          <div className="flex items-center space-x-2 text-white">
            <ApperIcon name="Grid3X3" size={16} />
            <span className="font-medium">Posts</span>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="p-4">
          {posts.length === 0 ? (
            <EmptyState 
              title={isCurrentUser ? "No posts yet" : `${user.displayName} hasn't posted yet`}
              description={isCurrentUser ? "Share your first post to get started" : "Check back later for new posts"}
              actionLabel={isCurrentUser ? "Create Post" : null}
              onAction={isCurrentUser ? () => navigate('/create') : null}
            />
          ) : (
            <PostGrid posts={posts} />
          )}
        </div>
      </div>

      {/* Floating Action Button (for current user) */}
      {isCurrentUser && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/create')}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg flex items-center justify-center z-30"
        >
          <ApperIcon name="Plus" size={24} className="text-white" />
        </motion.button>
      )}
    </motion.div>
  )
}

export default Profile