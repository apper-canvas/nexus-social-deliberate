import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import SearchBar from '@/components/organisms/SearchBar';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import PostGrid from '@/components/organisms/PostGrid';
import UserList from '@/components/organisms/UserList';
import TabButton from '@/components/molecules/TabButton';
import ApperIcon from '@/components/ApperIcon';
import postService from '@/services/api/postService'; // Keep API service imports here
import userService from '@/services/api/userService';

function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'posts') {
        const data = await postService.getTrending();
        setPosts(data);
      } else {
        const data = await userService.getSuggested();
        setUsers(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load explore data');
      toast.error('Failed to load explore data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      loadData();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'posts') {
        const data = await postService.search(query);
        setPosts(data);
      } else {
        const data = await userService.search(query);
        setUsers(data);
      }
    } catch (err) {
      setError(err.message || 'Search failed');
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
  };

  const handleFollow = async (userId) => {
    try {
      await userService.follow(userId);
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      ));
      toast.success('User followed!');
    } catch (err) {
      toast.error('Failed to follow user');
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-gray-800 z-30">
        <div className="p-4 space-y-4">
          <SearchBar 
            value={searchQuery}
            onChange={handleSearch}
            placeholder={`Search ${activeTab}...`}
          />
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-surface rounded-lg p-1">
            {['posts', 'people'].map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                iconName={tab === 'posts' ? 'Grid3X3' : 'Users'}
                isActive={activeTab === tab}
                onClick={() => handleTabChange(tab)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorState 
            message={error}
            onRetry={loadData}
          />
        ) : activeTab === 'posts' ? (
          posts.length === 0 ? (
            <EmptyState 
              title="No posts found"
              description={searchQuery ? "Try a different search term" : "No trending posts available"}
              actionLabel="Clear Search"
              onAction={() => handleSearch('')}
            />
          ) : (
            <PostGrid posts={posts} />
          )
        ) : (
          users.length === 0 ? (
            <EmptyState 
              title="No users found"
              description={searchQuery ? "Try a different search term" : "No suggested users available"}
              actionLabel="Clear Search"
              onAction={() => handleSearch('')}
            />
          ) : (
            <UserList users={users} onFollow={handleFollow} />
          )
        )}
      </div>
    </motion.div>
  );
}

export default ExplorePage;