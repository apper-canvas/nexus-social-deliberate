import { delay } from '../index'
import storiesData from '../mockData/stories.json'
import usersData from '../mockData/users.json'

// Simulate in-memory storage
let stories = [...storiesData].map(story => ({
  ...story,
  user: usersData.find(user => user.id === story.userId)
}))

const storyService = {
  async getAll() {
    await delay(250)
    // Filter out expired stories (older than 24 hours)
    const now = new Date()
    const activeStories = stories.filter(story => {
      const expiresAt = new Date(story.expiresAt)
      return expiresAt > now
    })
    return [...activeStories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getById(id) {
    await delay(200)
    const story = stories.find(s => s.id === id)
    if (!story) {
      throw new Error('Story not found')
    }
    return { ...story }
  },

  async getByUser(userId) {
    await delay(250)
    const now = new Date()
    return stories
      .filter(story => story.userId === userId && new Date(story.expiresAt) > now)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async create(storyData) {
    await delay(400)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // 24 hours from now
    
    const newStory = {
      id: Date.now().toString(),
      ...storyData,
      viewers: [],
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      user: usersData.find(user => user.id === storyData.userId)
    }
    stories.unshift(newStory)
    return { ...newStory }
  },

  async update(id, data) {
    await delay(300)
    const index = stories.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Story not found')
    }
    stories[index] = { ...stories[index], ...data }
    return { ...stories[index] }
  },

  async delete(id) {
    await delay(250)
    const index = stories.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Story not found')
    }
    stories.splice(index, 1)
    return true
  },

  async addViewer(id, viewerId) {
    await delay(200)
    const story = stories.find(s => s.id === id)
    if (!story) {
      throw new Error('Story not found')
    }
    
    story.viewers = story.viewers || []
    if (!story.viewers.includes(viewerId)) {
      story.viewers.push(viewerId)
    }
    
    return { ...story }
  }
}

export default storyService