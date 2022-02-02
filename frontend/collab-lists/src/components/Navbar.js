import { React } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg mt-10">
      <Link to="/" className="navbar-brand" style={{ marginLeft: "20px" }}>
        Listly
      </Link>
      <div className="">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              My Lists
            </Link>
          </li>
          {user ? (
            <li className="navbar-item">
              <Link to="/login" className="nav-link" onClick={logout}>
                Log out ({user})
              </Link>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
