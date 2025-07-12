""// SearchSwap.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../Swap/Swap.css';
import './Search.css';

import Navbar from '../Navbar/Navbar';

export default function Search() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const searchUsers = async () => {
    try {
      const res = await axios.get(`https://odoo-caffiene-coders.onrender.com/api/users/search?skill=${query}`);
      const filtered = res.data.filter((u) => u._id !== currentUser._id);
      setUsers(filtered);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const sendRequest = async (toUserId) => {
    try {
      await axios.post(`https://odoo-caffiene-coders.onrender.com/api/swaps/send`, {
        fromUser: currentUser._id,
        toUser: toUserId,
        message,
      });
      alert('Swap request sent!');
      setMessage('');
    } catch (err) {
      console.error('Request failed:', err);
      alert(err?.response?.data?.error || 'Swap request failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="swap-container">
        <h2>Search by Skill</h2>
        <input
          type="text"
          placeholder="Search skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={searchUsers}>Search</button>

        <div className="swap-list">
          {users.map((user) => (
            <div key={user._id} className="swap-card">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Skills Offered:</strong> {user.skillsOffered?.join(', ')}</p>
              <textarea
                placeholder="Write your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button onClick={() => sendRequest(user._id)}>Request Swap</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
