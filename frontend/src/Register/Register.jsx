import React from 'react'
import './Register.css'
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState} from 'react';
// import Navbar from '../pages/UserPage/Navbar/Navbar'

export default function Register() {

  const [names,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [username,setUsername]=useState('');

  const submit = async (e) => {
    e.preventDefault();
      try{
        const userDetails ={
          name:names,
          username:username,
          email:email,
          password:password,
        }

        const response = await axios.post('https://hotel-backend-nxua.onrender.com/api/users/createuser',userDetails);
        console.log(response.data);
        setTimeout(()=>{
          if(response.data){
            alert("User registered successfully");
            window.location.href="/";
          }else{
            alert("User registration failed");
          }
        },1000)
      }catch(error){
        console.error("Failed to register user:",error);
      }
    }

  return (
    <>
    {/* <Navbar/> */}
      <div className="register_wrapper">
        <div className="register_page">
          <h1 className="register_header">Register</h1>
          <form className="register_form" onSubmit={submit}>
            <div className="form_group" >
              <input placeholder="Enter your Name" type="text" id="name" name="name" value={names} onChange={(e)=>{setName(e.target.value)}}required />
            </div>
            <div className="form_group">
              <input placeholder="Enter your username"type="text" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required />
            </div>
            <div className="form_group">
              <input placeholder="Enter your email" type="email" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
            </div>
            <div className="form_group">
              <input placeholder="Enter your password" type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
            </div>
            <div className="registerbutton">
                <button type="submit" className="register_button">Register</button>
            </div>
            
          </form>
          <p className="register_login_prompt">
            Already have an account? <a href="/">Login here</a>
          </p>
        </div>
      </div>
    </>
    )
}
