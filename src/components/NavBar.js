import { Link } from "react-router-dom";
import { logout } from "../auth";

function NavBar({ loggedIn, onLogout }) {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <nav className="navbar px-4" style={{ borderBottom: "2px solid grey" }}>
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Home
        </Link>
      </div>
      <div className="navbar-end">
        {!loggedIn && (
          <Link className="navbar-item" to="/signUp">
            Sign Up
          </Link>
        )}
        {loggedIn ? (
          <>
            <Link className="navbar-item" to="/jobs/new">
              Post Job
            </Link>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="navbar-item" onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <Link className="navbar-item" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
