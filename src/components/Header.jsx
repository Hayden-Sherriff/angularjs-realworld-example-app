import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import config from '../config';

export default function Header() {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {config.appName.toLowerCase()}
        </Link>

        {!currentUser ? (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Sign up
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editor">
                <i className="ion-compose" />&nbsp;New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                <i className="ion-gear-a" />&nbsp;Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/@${currentUser.username}`}
              >
                {currentUser.image && (
                  <img
                    src={currentUser.image}
                    className="user-pic"
                    alt={currentUser.username}
                  />
                )}
                {currentUser.username}
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
