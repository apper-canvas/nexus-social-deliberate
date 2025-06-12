import { delay } from '../index'
import usersData from '../mockData/users.json'

// Simulate in-memory storage
let users = [...usersData]

const userService = {
  async getAll() {
    await delay(300)
    return [...users]
  },

  async getById(id) {
    await delay(200)
    const user = users.find(u => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return { ...user }
  },

  async getSuggested() {
    await delay(350)
    // Return users not followed by current user
    return users
      .filter(user => user.id !== 'current-user')
      .slice(0, 10)
      .map(user => ({
        ...user,
        isFollowing: Math.random() > 0.7 // Random follow status for demo
      }))
  },

  async search(query) {
    await delay(400)
    const searchTerm = query.toLowerCase()
    return users.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.displayName.toLowerCase().includes(searchTerm)
    ).map(user => ({
      ...user,
      isFollowing: Math.random() > 0.7
    }))
  },

  async create(userData) {
    await delay(500)
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      followers: [],
      following: [],
      createdAt: new Date().toISOString()
    }
    users.push(newUser)
    return { ...newUser }
  },

  async update(id, data) {
    await delay(300)
    const index = users.findIndex(u => u.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    users[index] = { ...users[index], ...data }
    return { ...users[index] }
  },

  async delete(id) {
    await delay(250)
    const index = users.findIndex(u => u.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    users.splice(index, 1)
    return true
  },

  async follow(id) {
    await delay(200)
    const user = users.find(u => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    
    // Toggle follow status for demo
    user.isFollowing = !user.isFollowing
    if (user.isFollowing) {
      user.followers = user.followers || []
      user.followers.push('current-user')
    } else {
      user.followers = (user.followers || []).filter(f => f !== 'current-user')
    }
    
    return { ...user }
  }
}

export default userService