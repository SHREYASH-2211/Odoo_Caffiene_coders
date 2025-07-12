import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../User/Navbar/Navbar.jsx';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        email,
        password,
      };

      const response = await axios.post('https://odoo-caffiene-coders.onrender.com/api/users/login', credentials);
      console.log("Login response:", response.data);

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('isLoggedIn', 'true');

      alert('Successfully logged in');

      // Redirect based on role/type
      if (response.data.type === 'admin') {
        window.location.href = '/staff_home';
      } else {
        window.location.href = '/home';
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid email or password');
    }
  };

  return (
    <>
      <Navbar />
      <div className="register_wrapper">
        <div className="register_page">
          <h1 className="register_header">Login</h1>
          <form className="register_form" onSubmit={submit}>
            <div className="form_group">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form_group">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="registerbutton">
              <button type="submit" className="register_button">Login</button>
            </div>
          </form>
          <p className="register_login_prompt">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </>
  );
}
