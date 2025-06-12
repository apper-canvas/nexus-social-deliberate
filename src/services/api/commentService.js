import { delay } from '../index'
import commentsData from '../mockData/comments.json'
import usersData from '../mockData/users.json'

// Simulate in-memory storage
let comments = [...commentsData].map(comment => ({
  ...comment,
  user: usersData.find(user => user.id === comment.userId)
}))

const commentService = {
  async getAll() {
    await delay(300)
    return [...comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getById(id) {
    await delay(200)
    const comment = comments.find(c => c.id === id)
    if (!comment) {
      throw new Error('Comment not found')
    }
    return { ...comment }
  },

  async getByPost(postId) {
    await delay(250)
    return comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  },

  async create(commentData) {
    await delay(400)
    const newComment = {
      id: Date.now().toString(),
      ...commentData,
      likes: 0,
      createdAt: new Date().toISOString(),
      user: usersData.find(user => user.id === commentData.userId)
    }
    comments.push(newComment)
    return { ...newComment }
  },

  async update(id, data) {
    await delay(300)
    const index = comments.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error('Comment not found')
    }
    comments[index] = { ...comments[index], ...data }
    return { ...comments[index] }
  },

  async delete(id) {
    await delay(250)
    const index = comments.findIndex(c => c.id === id)
    if (index === -1) {
      throw new Error('Comment not found')
    }
    comments.splice(index, 1)
    return true
  },

  async likeComment(id) {
    await delay(200)
    const comment = comments.find(c => c.id === id)
    if (!comment) {
      throw new Error('Comment not found')
    }
    comment.likes = (comment.likes || 0) + 1
    return { ...comment }
  }
}

export default commentService