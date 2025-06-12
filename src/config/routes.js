import Home from '../pages/Home'
import Explore from '../pages/Explore'
import CreatePost from '../pages/CreatePost'
import Profile from '../pages/Profile'

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  explore: {
    id: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: 'Search',
    component: Explore
  },
  create: {
    id: 'create',
    label: 'Create',
    path: '/create',
    icon: 'Plus',
    component: CreatePost
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    component: Profile
  }
}

export const routeArray = Object.values(routes)