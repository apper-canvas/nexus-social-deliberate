import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from './components/ApperIcon'
import { useState, useEffect } from 'react'

function Layout() {
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(null)

  // Mock user data - in real app this would come from auth context/service
  useEffect(() => {
    setCurrentUser({
      id: 1,
      name: 'John Doe',
      username: '@johndoe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces',
      followers: 1234,
      following: 567,
      posts: 89
    })
  }, [])

  const mainNavItems = [
    { path: '/', icon: 'Home', label: 'Feed' },
    { path: '/explore', icon: 'Search', label: 'Explore' },
    { path: '/notifications', icon: 'Bell', label: 'Notifications' },
    { path: '/messages', icon: 'MessageCircle', label: 'Messages' },
    { path: '/create', icon: 'Plus', label: 'Direct' },
    { path: '/stats', icon: 'BarChart3', label: 'Stats' }
  ]

  const bottomNavItems = [
    { path: '/settings', icon: 'Settings', label: 'Settings' },
    { path: '/logout', icon: 'LogOut', label: 'Logout', action: 'logout' }
  ]

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked')
  }

  return (
<div className="h-screen flex overflow-hidden bg-background">
      {/* Left Sidebar */}
<aside className="flex-shrink-0 w-56 bg-surface/95 backdrop-blur border-r border-gray-700 sticky top-0 h-full">
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="text-2xl font-heading font-bold gradient-text">Nexus</h1>
          </div>

          {/* Profile Preview */}
          {currentUser && (
            <div className="mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700 flex-shrink-0">
              <NavLink to="/profile" className="block group">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-600 group-hover:ring-primary transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">{currentUser.name}</h3>
                    <p className="text-gray-400 text-xs">{currentUser.username}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-white font-semibold text-sm">{currentUser.posts}</div>
                    <div className="text-gray-400 text-xs">Posts</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{currentUser.followers}</div>
                    <div className="text-gray-400 text-xs">Followers</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{currentUser.following}</div>
                    <div className="text-gray-400 text-xs">Following</div>
                  </div>
                </div>
              </NavLink>
            </div>
          )}

          {/* Scrollable Navigation Container */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Main Navigation */}
            <nav className="space-y-2 mb-8">
              {mainNavItems.map((item) => {
                const isActive = item.path === '/' 
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path)
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 transition-all group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ApperIcon 
                        name={item.icon} 
                        size={18} 
                        className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                      />
                    </motion.div>
                    <span className={`font-medium text-sm transition-all ${
                      isActive 
                        ? 'text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold' 
                        : 'text-gray-400 group-hover:text-white'
                    }`}>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>
          </div>

          {/* Bottom Navigation - Fixed at bottom */}
          <div className="border-t border-gray-700 pt-4 flex-shrink-0">
            <nav className="space-y-2">
              {bottomNavItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path)
                
                if (item.action === 'logout') {
                  return (
                    <button
                      key={item.path}
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ApperIcon 
                          name={item.icon} 
                          size={18} 
                          className="text-gray-400 group-hover:text-white"
                        />
                      </motion.div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  )
                }
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 transition-all group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ApperIcon 
                        name={item.icon} 
                        size={18} 
                        className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                      />
                    </motion.div>
                    <span className={`font-medium text-sm transition-all ${
                      isActive 
                        ? 'text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold' 
                        : 'text-gray-400 group-hover:text-white'
                    }`}>{item.label}</span>
                  </NavLink>
                )
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto min-h-full p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Layout