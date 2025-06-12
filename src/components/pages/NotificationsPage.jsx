import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import NotificationList from '@/components/organisms/NotificationList'
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton'
import ErrorState from '@/components/organisms/ErrorState'
import EmptyState from '@/components/organisms/EmptyState'
import notificationService from '@/services/api/notificationService'

function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // all, unread, read

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await notificationService.getAll()
      setNotifications(data)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      )
      toast.success('Notification marked as read')
    } catch (err) {
      toast.error('Failed to update notification')
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead()
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      )
      toast.success('All notifications marked as read')
    } catch (err) {
      toast.error('Failed to update notifications')
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead
    if (filter === 'read') return notif.isRead
    return true
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-heading font-bold gradient-text">Notifications</h1>
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to load notifications"
        message={error}
        onRetry={loadNotifications}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-heading font-bold gradient-text">Notifications</h1>
          {unreadCount > 0 && (
            <div className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
              {unreadCount} new
            </div>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Check" size={16} />
            <span>Mark all as read</span>
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl border border-gray-700">
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'read', label: 'Read', count: notifications.length - unreadCount }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === tab.key
                ? 'bg-primary text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 text-xs ${
                filter === tab.key ? 'text-primary-light' : 'text-gray-500'
              }`}>
                ({tab.count})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon="Bell"
          title={
            filter === 'unread' ? 'No unread notifications' :
            filter === 'read' ? 'No read notifications' :
            'No notifications yet'
          }
          description={
            filter === 'unread' ? 'All caught up! Check back later for new activity.' :
            filter === 'read' ? 'No notifications have been read yet.' :
            "You'll see notifications for likes, comments, and follows here."
          }
        />
      ) : (
        <NotificationList
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkAsRead}
        />
      )}
    </motion.div>
  )
}

export default NotificationsPage