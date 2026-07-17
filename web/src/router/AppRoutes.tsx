// Route definitions, equivalent to the AngularJS ui-router states.
// The abstract `app` state becomes <AppLayout>; protected states
// (editor, settings) are wrapped in <RequireAuth>, guest-only states
// (login, register) in <RequireAuth requireAuth={false}>.
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/layout';
import { RequireAuth } from '@/auth';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ArticlePage,
  EditorPage,
  ProfilePage,
  SettingsPage,
  NotFoundPage,
} from '@/pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />

        {/* Guest-only routes */}
        <Route element={<RequireAuth requireAuth={false} />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="article/:slug" element={<ArticlePage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="editor" element={<EditorPage />} />
          <Route path="editor/:slug" element={<EditorPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Profile: /@username and its favorites tab */}
        <Route path="@:username" element={<ProfilePage />} />
        <Route path="@:username/favorites" element={<ProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
