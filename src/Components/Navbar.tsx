import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { logout, loading, error } = useAuth();
  const loggedUser = localStorage.getItem("LoggedUser");

  useEffect(() => {
    const loggedUser = localStorage.getItem("LoggedUser");

    if (loggedUser) {
      try {
        const parsedUser = JSON.parse(loggedUser);
        setIsLoggedIn(true);
        setUserName(parsedUser.name || "");
      } catch (err) {
        console.error("Invalid JSON in LoggedUser", err);
        setIsLoggedIn(false);
        setUserName("");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [loggedUser]);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        localStorage.removeItem("LoggedUser");
        setIsLoggedIn(false);
        setUserName("");
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/">
          BlogApp
        </Link>

        <div className="d-flex align-items-center">
          {loading ? (
            <span className="text-muted me-3">Loading...</span>
          ) : isLoggedIn ? (
            <>
              <span className="me-3 fw-bold">Welcome, {userName}</span>
              <Link className="btn btn-outline-primary me-2" to="/create">
                Create
              </Link>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Signup
              </Link>
            </>
          )}
          {error && <span className="text-danger ms-2">Error: {error}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
