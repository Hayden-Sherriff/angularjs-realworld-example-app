import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Settings from './features/settings/Settings';
import Editor from './features/editor/Editor';
import Article from './features/article/Article';
import Profile from './features/profile/Profile';
import ProfileArticles from './features/profile/ProfileArticles';
import ProfileFavorites from './features/profile/ProfileFavorites';

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:slug"
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          }
        />

        <Route path="/article/:slug" element={<Article />} />

        <Route path="/@:username" element={<Profile />}>
          <Route index element={<ProfileArticles />} />
          <Route path="favorites" element={<ProfileFavorites />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}
