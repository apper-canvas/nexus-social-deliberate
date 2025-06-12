import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from './components/ApperIcon'

function Layout() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: 'Home', label: 'Home' },
    { path: '/explore', icon: 'Search', label: 'Explore' },
    { path: '/create', icon: 'Plus', label: 'Create' },
    { path: '/profile', icon: 'User', label: 'Profile' }
  ]

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-background/95 backdrop-blur border-b border-gray-800 z-40">
        <div className="max-w-md mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-heading font-bold gradient-text">Nexus</h1>
          </div>
          
          <button className="p-2 hover:bg-surface rounded-lg transition-colors">
            <ApperIcon name="Bell" size={20} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto min-h-full">
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

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 bg-surface/95 backdrop-blur border-t border-gray-700 z-40">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = item.path === '/' 
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path)
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center py-2 px-3 rounded-lg transition-all"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary to-secondary' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <ApperIcon 
                      name={item.icon} 
                      size={20} 
                      className={isActive ? 'text-white' : 'text-gray-400'}
                    />
                  </motion.div>
                  <span className={`text-xs mt-1 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`}>
                    {item.label}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Layout