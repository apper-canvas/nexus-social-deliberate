import { delay } from '../index'
import notificationsData from '../mockData/notifications.json'
import usersData from '../mockData/users.json'
import postsData from '../mockData/posts.json'

// Simulate in-memory storage
let notifications = [...notificationsData].map(notification => ({
  ...notification,
  user: usersData.find(user => user.id === notification.userId),
  post: notification.postId ? postsData.find(post => post.id === notification.postId) : null
}))

const notificationService = {
  async getAll() {
    await delay(300)
    return [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getById(id) {
    await delay(200)
    const notification = notifications.find(n => n.id === id)
    if (!notification) {
      throw new Error('Notification not found')
    }
    return { ...notification }
  },

  async getUnread() {
    await delay(250)
    return notifications
      .filter(notification => !notification.isRead)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async markAsRead(id) {
    await delay(200)
    const index = notifications.findIndex(n => n.id === id)
    if (index === -1) {
      throw new Error('Notification not found')
    }
    notifications[index] = { ...notifications[index], isRead: true }
    return { ...notifications[index] }
  },

  async markAllAsRead() {
    await delay(400)
    notifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }))
    return [...notifications]
  },

  async create(notificationData) {
    await delay(300)
    const newNotification = {
      id: Date.now().toString(),
      ...notificationData,
      isRead: false,
      createdAt: new Date().toISOString(),
      user: usersData.find(user => user.id === notificationData.userId),
      post: notificationData.postId ? postsData.find(post => post.id === notificationData.postId) : null
    }
    notifications.unshift(newNotification)
    return { ...newNotification }
  },

  async delete(id) {
    await delay(250)
    const index = notifications.findIndex(n => n.id === id)
    if (index === -1) {
      throw new Error('Notification not found')
    }
    notifications.splice(index, 1)
    return true
  }
}

export default notificationService