import { motion } from 'framer-motion'
import NotificationItem from '@/components/molecules/NotificationItem'

function NotificationList({ notifications, onMarkAsRead }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {notifications.map((notification, index) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
        >
          <NotificationItem
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default NotificationList