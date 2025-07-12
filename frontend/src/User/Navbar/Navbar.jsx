import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  // const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === 'true');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const mode = darkMode ? 'dark-mode' : 'light-mode';
  //   document.body.className = mode;
  //   localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  // }, [darkMode]);

  useEffect(() => {
    const checkLogin = () => {
      const status = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(status);
    };
    checkLogin();

    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  // const handleToggle = () => {
  //   setDarkMode(prev => !prev);
  // };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    navigate('/');
  };

  if (!isLoggedIn) return null;

  return (
    <div className="navbar_wrapper">
      <div className="navbar">
        <div className="navbar_logo">
          <h1 className="navbar_title">SkillSwap</h1>
        </div>

        <div className="navbar_links">
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>Home</NavLink>
          <NavLink to="/create-profile" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>Profile</NavLink>
          {/* <NavLink to="/search" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>Search</NavLink> */}
          <NavLink to="/swaps" className={({ isActive }) => isActive ? "nav_button active" : "nav_button"}>Swaps</NavLink>
        </div>

        <div className="navbar_controls">
          {/* <label className="theme_toggle">
            <input type="checkbox" checked={darkMode} onChange={handleToggle} />
            <span className="slider round"></span>
          </label> */}
          <button className="logout_button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
