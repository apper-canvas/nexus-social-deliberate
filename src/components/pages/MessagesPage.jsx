import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import MessageInput from '@/components/organisms/MessageInput';
import messageService from '@/services/api/messageService';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation.id);
    }
  }, [currentConversation]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageService.getConversations();
      setConversations(data);
    } catch (err) {
      setError('Failed to load conversations');
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      setMessagesLoading(true);
      const data = await messageService.getMessages(conversationId);
      setMessages(data);
      
      // Mark messages as read
      await messageService.markAsRead(conversationId);
      
      // Update conversation unread count
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      ));
    } catch (err) {
      toast.error('Failed to load messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSendMessage = async (content, attachment = null) => {
    if (!currentConversation) return;

    try {
      const newMessage = await messageService.sendMessage(currentConversation.id, {
        content,
        attachment
      });

      setMessages(prev => [...prev, newMessage]);
      
      // Update conversation's last message
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversation.id
          ? { 
              ...conv, 
              lastMessage: newMessage,
              updatedAt: newMessage.createdAt
            }
          : conv
      ));

      toast.success('Message sent');
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  const handleConversationSelect = (conversation) => {
    setCurrentConversation(conversation);
  };

  const handleBackToList = () => {
    setCurrentConversation(null);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadConversations} />;
  }

  // Mobile view - show either conversation list or chat
  if (isMobile) {
    if (currentConversation) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-screen bg-white"
        >
          {/* Mobile Chat Header */}
          <div className="flex items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToList}
              className="mr-3 p-2"
            >
              <ApperIcon name="ArrowLeft" size={20} />
            </Button>
            <img
              src={currentConversation.user.avatar}
              alt={currentConversation.user.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{currentConversation.user.name}</h3>
              <p className="text-sm text-gray-500">
                {currentConversation.user.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messagesLoading ? (
              <LoadingSkeleton />
            ) : messages.length === 0 ? (
              <EmptyState
                icon="MessageCircle"
                title="No messages yet"
                description="Start the conversation by sending a message"
              />
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 bg-white">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </motion.div>
      );
    }

    // Mobile conversation list
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
        {conversations.length === 0 ? (
          <EmptyState
            icon="MessageCircle"
            title="No conversations"
            description="Start messaging with your friends"
          />
        ) : (
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                onClick={() => handleConversationSelect(conversation)}
              />
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  // Desktop view - side by side layout
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen bg-white"
    >
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon="MessageCircle"
                title="No conversations"
                description="Start messaging with your friends"
              />
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={currentConversation?.id === conversation.id}
                  onClick={() => handleConversationSelect(conversation)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <img
                  src={currentConversation.user.avatar}
                  alt={currentConversation.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{currentConversation.user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {currentConversation.user.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messagesLoading ? (
                <LoadingSkeleton />
              ) : messages.length === 0 ? (
                <EmptyState
                  icon="MessageCircle"
                  title="No messages yet"
                  description="Start the conversation by sending a message"
                />
              ) : (
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 bg-white">
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon="MessageCircle"
              title="Select a conversation"
              description="Choose a conversation from the list to start messaging"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ConversationItem = ({ conversation, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      className={`p-4 cursor-pointer transition-colors ${
        isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <img
            src={conversation.user.avatar}
            alt={conversation.user.name}
            className="w-12 h-12 rounded-full"
          />
          {conversation.user.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 truncate">
              {conversation.user.name}
            </h4>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 truncate mt-1">
            {conversation.lastMessage?.content || 'No messages yet'}
          </p>
          
          {conversation.unreadCount > 0 && (
            <div className="flex justify-end mt-1">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                {conversation.unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MessageBubble = ({ message }) => {
  const isOwn = message.senderId === 'current-user';
  
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        {message.attachment && (
          <div className="mb-2">
            {message.attachment.type === 'image' ? (
              <img 
                src={message.attachment.url} 
                alt="Attachment"
                className="rounded max-w-full h-auto"
              />
            ) : (
              <div className="flex items-center space-x-2 p-2 bg-white bg-opacity-10 rounded">
                <ApperIcon name="File" size={16} />
                <span className="text-sm">{message.attachment.name}</span>
              </div>
            )}
          </div>
        )}
        
        {message.content && (
          <p className="text-sm">{message.content}</p>
        )}
        
        <p className={`text-xs mt-1 ${
          isOwn ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default MessagesPage;