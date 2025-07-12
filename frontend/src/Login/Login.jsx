import React from 'react'
import './Login.css'
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState} from 'react';
import Navbar from '../User/Navbar/Navbar.jsx';

export default function Login() {

  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('');

  const submit = async (e) => {
  e.preventDefault();
  try {
    const userDetails = {
      username: username,
      password: password,
    };

    const response = await axios.post('http://localhost:2211/api/users/login', userDetails);
    console.log(response.data);

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("isLoggedIn", "true");

    setTimeout(() => {
      if (response.data && response.data.type) {
        alert("Successfully logged in");

        // Redirect based on type
        if (response.data.type === "admin") {
          window.location.href = "/staff_home"; // change to your actual staff route
        } else {
          window.location.href = "/home";  // regular user route
        }
      } else {
        alert("User login failed");
      }
    }, 1000);

  } catch (error) {
    console.error("Failed to log in user:", error);
    alert("Invalid username or password");
  }
}


  return (
    <>
    <Navbar />
      <div className="register_wrapper">
        <div className="register_page">
          <h1 className="register_header">Login</h1>
          <form className="register_form" onSubmit={submit}>
            
            <div className="form_group">
              <input placeholder="Enter your username"type="text" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required />
            </div>
            <div className="form_group">
              <input placeholder="Enter your password" type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
            </div>
            <div className="registerbutton">
                <button type="submit" className="register_button">Login</button>
            </div>
            
          </form>
          <p className="register_login_prompt">
            Don't have an account? <a href="/register" className="">Register here</a>
          </p>
        </div>
      </div>
    </>
    )
}
