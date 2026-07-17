// Top-level layout shell, equivalent to the abstract `app` state and
// src/js/layout/app-view.html: header + routed outlet + footer.
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
