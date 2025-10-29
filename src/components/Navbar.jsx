import { useState } from 'react';
import '../styles/navbar.css';
import { Logout } from '../utils/Logout';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(false)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

const LogoutUser = () => {
    Logout()
    navigate("/auth/login")
}

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">MyApp</h1>
        <h2 className="nav-links">
          <a href="/">Home</a>
        </h2>
      </div>
      <div className="navbar-right">
        {token ? (
          <div className="user-profile">
            <Link to="/cart">
              <img
                className="cartpic" 
                src="https://www.citypng.com/public/uploads/preview/hd-shopping-cart-white-logo-icon-transparent-png-701751694973936amdcratijm.png"            
                alt="Cart pic"
              />
            </Link>
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
          <a href="/auth/login" className="login-btn">Login</a>
        )}
      </div>
    </nav>
  );
};

