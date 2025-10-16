// Navbar.jsx
import React, { useState } from 'react';
import '../styles/navbar.css'; // optional CSS file
import { Logout } from '../utils/Logout';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(false)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

const LogoutUser = () => {
    Logout()
    navigate("/login")
}

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">MyApp</h1>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        {token ? (
          <div className="user-profile">
            <img
              src={user.avatar || 'https://i.pravatar.cc/40'}
              alt="User Avatar"
              className="avatar"
              onClick={toggleMenu}
            />
            {showMenu && (
              <div className="dropdown-menu">
                <p>{user.name || user.email}</p>
                <button onClick={LogoutUser}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="login-btn">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
