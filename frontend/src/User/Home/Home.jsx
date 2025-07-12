// ===============================
// UserHome.jsx - Home Page with Welcome & Search (Corrected useEffect warning)
// ===============================

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const [availability, setAvailability] = useState('');
  const [search, setSearch] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/profiles/search?skill=${search}`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = () => {
    fetchUsers();
  };

  return (
    <>
      <Navbar />
      <div className="home-wrapper">
        <div className="welcome-message">
          <h1>Welcome to your dashboard, <Link to={`/create-profile`} className="user-home-link">{user?.username || 'User'}</Link> 👋</h1>
        </div>

        <div className="search-bar">
          <select value={availability} onChange={e => setAvailability(e.target.value)}>
            <option value="">Availability</option>
            <option value="weekends">Weekends</option>
            <option value="evenings">Evenings</option>
          </select>
          <input
            type="text"
            placeholder="Search skill..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="user-list">
          {users.map((user, idx) => (
            <div className="user-card" key={idx}>
              <div className="profile-left">
                <img
                  src={user.profilePhoto || '/default-avatar.png'}
                  alt="Profile"
                  className="profile-photo"
                />
              </div>
              <div className="profile-middle">
                <h2>{user.name}</h2>
                <p><span className="label">Skills Offered:</span> {user.skillsOffered.map(s => <span className="tag" key={s}>{s}</span>)}</p>
                <p><span className="label">Skills Wanted:</span> {user.skillsWanted.map(s => <span className="tag" key={s}>{s}</span>)}</p>
              </div>
              <div className="profile-right">
                <button className="request-button">Request</button>
                <p className="rating">rating 3.9/5</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <span>{'<'} </span>
          {[1, 2, 3, 4, 5, 6, 7].map(page => (
            <span key={page}>{page}</span>
          ))}
          <span> {'>'}</span>
        </div>
      </div>
    </>
  );
};

export default Home;
