import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const status = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(status);
    };
    checkLogin();

    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="navbar_wrapper">
      <div className="navbar">
        <div className="navbar_logo">
          <h1 className="navbar_title">SkillSwap</h1>
        </div>

        {isLoggedIn && (
          <div className="navbar_links">
            <NavLink to="/home" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>Home</NavLink>
            <NavLink to="/create-profile" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>Profile</NavLink>
            <NavLink to="/swaps" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>Swaps</NavLink>
            <NavLink to="/swapsrequest" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>SwapsRequest</NavLink>
          </div>
        )}

        <div className="navbar_controls">
          {isLoggedIn && (
            <button className="logout_button" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}
