import HomePage from '@/components/pages/HomePage';
import ExplorePage from '@/components/pages/ExplorePage';
import CreatePostPage from '@/components/pages/CreatePostPage';
import ProfilePage from '@/components/pages/ProfilePage';
import MessagesPage from '@/components/pages/MessagesPage';
export const routes = {
  home: {
    id: 'home',
    label: 'Feed',
    path: '/',
    icon: 'Home',
    component: HomePage
  },
  explore: {
    id: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: 'Search',
    component: ExplorePage
  },
  notifications: {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: 'Bell',
    component: null // To be implemented
  },
messages: {
    id: 'messages',
    label: 'Messages',
    path: '/messages',
    icon: 'MessageCircle',
    component: MessagesPage
  },
  create: {
    id: 'create',
    label: 'Direct',
    path: '/create',
    icon: 'Plus',
    component: CreatePostPage
  },
  stats: {
    id: 'stats',
    label: 'Stats',
    path: '/stats',
    icon: 'BarChart3',
    component: null // To be implemented
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    component: ProfilePage
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    component: null // To be implemented
  }
}

export const routeArray = Object.values(routes)