import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import Layout from './Layout';
import HomePage from '@/components/pages/HomePage';
import ExplorePage from '@/components/pages/ExplorePage';
import ProfilePage from '@/components/pages/ProfilePage';
import CreatePostPage from '@/components/pages/CreatePostPage';
import MessagesPage from '@/components/pages/MessagesPage';
import NotFoundPage from '@/components/pages/NotFoundPage';
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-white">
        <AnimatePresence mode="wait">
          <Routes>
<Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
<Route path="/create" element={<CreatePostPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile/:userId?" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
        
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-surface border border-gray-700"
          progressClassName="bg-gradient-to-r from-primary to-secondary"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  )
}

export default App