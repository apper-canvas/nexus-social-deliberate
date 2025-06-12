import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Feed from '@/components/organisms/Feed';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import postService from '@/services/api/postService'; // Keep API service imports here
import storyService from '@/services/api/storyService';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postsData, storiesData] = await Promise.all([
        postService.getAll(),
        storyService.getAll()
      ]);
      setPosts(postsData);
      setStories(storiesData);
    } catch (err) {
      setError(err.message || 'Failed to load feed');
      toast.error('Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData();
      toast.success('Feed refreshed!');
    } catch (err) {
      toast.error('Failed to refresh feed');
    } finally {
      setRefreshing(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const updatedPost = await postService.likePost(postId);
      setPosts(prev => prev.map(post => 
        post.id === postId ? updatedPost : post
      ));
    } catch (err) {
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const updatedPost = await postService.addComment(postId, text);
      setPosts(prev => prev.map(post => 
        post.id === postId ? updatedPost : post
      ));
      toast.success('Comment added!');
    } catch (err) {
      toast.error('Failed to add comment');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && posts.length === 0) {
    return (
      <div className="pb-20">
        <div className="p-4">
          <div className="flex space-x-3 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="w-12 h-3 bg-gray-700 rounded mt-2 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <ErrorState 
          message={error}
          onRetry={loadData}
        />
      </div>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <EmptyState 
          title="No posts yet"
          description="Follow some users to see their posts in your feed"
          actionLabel="Explore Users"
          onAction={() => { /* In a real app, navigate to explore page */ }}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-primary/90 text-white text-center py-2 text-sm">
          Refreshing feed...
        </div>
      )}

      <Feed 
        posts={posts} 
        stories={stories} 
        onLike={handleLike} 
        onComment={handleComment} 
      />

      {/* Load more trigger */}
      <div className="p-4 text-center">
        <button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          {refreshing ? 'Loading...' : 'Load more posts'}
        </button>
      </div>
    </motion.div>
  );
}

export default HomePage;