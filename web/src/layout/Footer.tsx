// Ported from src/js/layout/footer.{component,html}.js.
import { Link } from 'react-router-dom';
import AppConstants from '@/config/constants';

export function Footer() {
  return (
    <footer>
      <div className="container">
        <Link className="logo-font" to="/">
          {AppConstants.appName.toLowerCase()}
        </Link>
        <span className="attribution">
          &copy; {new Date().getFullYear()}. An interactive learning project
          from <a href="https://thinkster.io">Thinkster</a>. Code licensed under
          MIT.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
