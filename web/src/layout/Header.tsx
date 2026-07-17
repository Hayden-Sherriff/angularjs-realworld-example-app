// Ported from src/js/layout/header.{component,html}.js.
import { NavLink, Link } from 'react-router-dom';
import AppConstants from '@/config/constants';
import { useAuth } from '@/auth/useAuth';
import { ShowAuthed } from '@/components/ShowAuthed';

function navClass({ isActive }: { isActive: boolean }): string {
  return isActive ? 'nav-link active' : 'nav-link';
}

export function Header() {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {AppConstants.appName.toLowerCase()}
        </Link>

        {/* Logged-out navigation */}
        <ShowAuthed authed={false}>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink to="/" className={navClass} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className={navClass}>
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className={navClass}>
                Sign up
              </NavLink>
            </li>
          </ul>
        </ShowAuthed>

        {/* Logged-in navigation */}
        <ShowAuthed authed>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink to="/" className={navClass} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/editor" className={navClass}>
                <i className="ion-compose" />
                &nbsp;New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/settings" className={navClass}>
                <i className="ion-gear-a" />
                &nbsp;Settings
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink to={`/@${user.username}`} className={navClass}>
                  {user.image && (
                    <img src={user.image} className="user-pic" alt="" />
                  )}
                  {user.username}
                </NavLink>
              </li>
            )}
          </ul>
        </ShowAuthed>
      </div>
    </nav>
  );
}

export default Header;
