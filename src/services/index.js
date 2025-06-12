export { default as postService } from './api/postService'
export { default as userService } from './api/userService'
export { default as storyService } from './api/storyService'
export { default as commentService } from './api/commentService'

// Utility function for simulating network delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))