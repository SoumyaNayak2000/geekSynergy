import { Link } from "react-router-dom";
import "../styles/header.scss";
import { FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

const Header = ({ isAuthenticated }) => {
  return (
    <header className="header">
      <div className="logo">
        <h2>
          <span className="geekSynergy">
            <span className="geek">Geek</span>
            <span className="synergy">Synergy</span>
          </span>
        </h2>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to={isAuthenticated ? "/movies" : "/"}>
              {isAuthenticated ? "Movies" : "Signup"}
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to={isAuthenticated ? "/me" : "/login"}>
              {isAuthenticated ? <FaUser /> : <FiLogIn />}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
