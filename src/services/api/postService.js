import { delay } from '../index'
import postsData from '../mockData/posts.json'
import usersData from '../mockData/users.json'

// Simulate in-memory storage
let posts = [...postsData].map(post => ({
  ...post,
  user: usersData.find(user => user.id === post.userId)
}))

const postService = {
  async getAll() {
    await delay(300)
    return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getById(id) {
    await delay(200)
    const post = posts.find(p => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    return { ...post }
  },

  async getByUser(userId) {
    await delay(250)
    return posts
      .filter(post => post.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getTrending() {
    await delay(350)
    return [...posts]
      .sort((a, b) => (b.likes + b.comments.length) - (a.likes + a.comments.length))
      .slice(0, 20)
  },

  async search(query) {
    await delay(400)
    const searchTerm = query.toLowerCase()
    return posts.filter(post => 
      post.caption.toLowerCase().includes(searchTerm) ||
      post.user?.username.toLowerCase().includes(searchTerm) ||
      post.user?.displayName.toLowerCase().includes(searchTerm)
    )
  },

  async create(postData) {
    await delay(500)
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      user: usersData.find(user => user.id === postData.userId)
    }
    posts.unshift(newPost)
    return { ...newPost }
  },

  async update(id, data) {
    await delay(300)
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Post not found')
    }
    posts[index] = { ...posts[index], ...data }
    return { ...posts[index] }
  },

  async delete(id) {
    await delay(250)
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Post not found')
    }
    posts.splice(index, 1)
    return true
  },

  async likePost(id) {
    await delay(200)
    const post = posts.find(p => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    post.likes = (post.likes || 0) + 1
    return { ...post }
  },

async addComment(id, text) {
    await delay(300)
    const post = posts.find(p => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    
    const newComment = {
      id: Date.now().toString(),
      postId: id,
      userId: 'current-user',
      text,
      likes: 0,
      createdAt: new Date().toISOString(),
      user: usersData.find(user => user.id === 'current-user')
    }
    
    post.comments = post.comments || []
    post.comments.push(newComment)
    return { ...post }
  },

  async savePost(id) {
    await delay(300)
    const post = posts.find(p => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    
    // Find current user and add post to their saved posts
    const currentUser = usersData.find(user => user.id === 'current-user')
    if (currentUser) {
      currentUser.savedPosts = currentUser.savedPosts || []
      if (!currentUser.savedPosts.includes(id)) {
        currentUser.savedPosts.push(id)
      }
    }
    
    return { ...post }
  },

  async unsavePost(id) {
    await delay(300)
    const post = posts.find(p => p.id === id)
    if (!post) {
      throw new Error('Post not found')
    }
    
    // Find current user and remove post from their saved posts
    const currentUser = usersData.find(user => user.id === 'current-user')
    if (currentUser && currentUser.savedPosts) {
      currentUser.savedPosts = currentUser.savedPosts.filter(postId => postId !== id)
    }
    
    return { ...post }
  }
}

export default postService