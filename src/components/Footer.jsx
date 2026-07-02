import { Link } from 'react-router-dom';
import config from '../config';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <Link className="logo-font" to="/">
          {config.appName.toLowerCase()}
        </Link>
        <span className="attribution">
          &copy; {new Date().getFullYear()}. An interactive learning project from{' '}
          <a href="https://thinkster.io">Thinkster</a>. Code licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
