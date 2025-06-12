import messagesData from '@/services/mockData/messages.json';

class MessageService {
  constructor() {
    this.messages = [...messagesData.messages];
    this.conversations = [...messagesData.conversations];
  }

  // Get all conversations for current user
  async getConversations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sort by most recent activity
        const sortedConversations = this.conversations
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        resolve([...sortedConversations]);
      }, 300);
    });
  }

  // Get messages for a specific conversation
  async getMessages(conversationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conversationMessages = this.messages
          .filter(msg => msg.conversationId === conversationId)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        resolve([...conversationMessages]);
      }, 200);
    });
  }

  // Send a new message
  async sendMessage(conversationId, messageData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage = {
          id: Date.now().toString(),
          conversationId,
          senderId: 'current-user',
          content: messageData.content,
          attachment: messageData.attachment || null,
          createdAt: new Date().toISOString(),
          isRead: false
        };

        this.messages.push(newMessage);

        // Update conversation's last message and timestamp
        const conversationIndex = this.conversations.findIndex(c => c.id === conversationId);
        if (conversationIndex !== -1) {
          this.conversations[conversationIndex] = {
            ...this.conversations[conversationIndex],
            lastMessage: newMessage,
            updatedAt: newMessage.createdAt
          };
        }

        resolve({ ...newMessage });
      }, 300);
    });
  }

  // Mark all messages in a conversation as read
  async markAsRead(conversationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mark all messages in conversation as read
        this.messages = this.messages.map(msg => 
          msg.conversationId === conversationId && msg.senderId !== 'current-user'
            ? { ...msg, isRead: true }
            : msg
        );

        // Update conversation unread count
        const conversationIndex = this.conversations.findIndex(c => c.id === conversationId);
        if (conversationIndex !== -1) {
          this.conversations[conversationIndex] = {
            ...this.conversations[conversationIndex],
            unreadCount: 0
          };
        }

        resolve(true);
      }, 100);
    });
  }

  // Get unread message count for a conversation
  async getUnreadCount(conversationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const unreadCount = this.messages.filter(msg => 
          msg.conversationId === conversationId && 
          msg.senderId !== 'current-user' && 
          !msg.isRead
        ).length;
        resolve(unreadCount);
      }, 100);
    });
  }

  // Search messages
  async searchMessages(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredMessages = this.messages.filter(msg =>
          msg.content.toLowerCase().includes(query.toLowerCase())
        );
        resolve([...filteredMessages]);
      }, 200);
    });
  }

  // Delete message
  async deleteMessage(messageId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          this.messages.splice(messageIndex, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 200);
    });
  }

  // Start new conversation
  async startConversation(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingConversation = this.conversations.find(conv => 
          conv.user.id === userId
        );

        if (existingConversation) {
          resolve({ ...existingConversation });
        } else {
          const newConversation = {
            id: Date.now().toString(),
            user: {
              id: userId,
              name: `User ${userId}`,
              avatar: `https://ui-avatars.com/api/?name=User+${userId}&background=e3f2fd&color=1976d2&size=128`,
              isOnline: Math.random() > 0.5
            },
            lastMessage: null,
            unreadCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          this.conversations.push(newConversation);
          resolve({ ...newConversation });
        }
      }, 300);
    });
  }
}

const messageService = new MessageService();
export default messageService;