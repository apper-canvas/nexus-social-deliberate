import HomePage from '@/components/pages/HomePage';
import ExplorePage from '@/components/pages/ExplorePage';
import CreatePostPage from '@/components/pages/CreatePostPage';
import ProfilePage from '@/components/pages/ProfilePage';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
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
  create: {
    id: 'create',
    label: 'Create',
    path: '/create',
    icon: 'Plus',
component: CreatePostPage
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
component: ProfilePage
  }
}

export const routeArray = Object.values(routes)