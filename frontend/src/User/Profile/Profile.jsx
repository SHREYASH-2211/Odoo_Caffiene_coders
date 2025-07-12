import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Profile.css';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:2211/api/users/getusers/${user._id}`);
        const userObj = {
          ...res.data,
          skillsOffered: res.data.skillsOffered || [],
          skillsWanted: res.data.skillsWanted || []
        };
        setUserData(userObj);
        setForm(userObj);
      } catch (err) {
        console.error('Failed to load user profile:', err);
      }
    };

    if (user?._id) fetchUser();
  }, [user?._id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedForm = {
        ...form,
        skillsOffered: typeof form.skillsOffered === 'string' ? form.skillsOffered.split(',').map(s => s.trim()) : form.skillsOffered,
        skillsWanted: typeof form.skillsWanted === 'string' ? form.skillsWanted.split(',').map(s => s.trim()) : form.skillsWanted,
      };

      const res = await axios.put(`http://localhost:2211/api/users/userUpdate/${user?._id}`, updatedForm);
      alert('Profile updated successfully');
      setUserData(res.data);
      setForm(res.data);
      setIsEditing(false);
    } catch (err) {
      alert('Update failed');
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="profile-tab-header">
          <button className="active-tab">Profile</button>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>

        <div className="profile-tab-card">
          <div className="profile-sidebar">
            <img
              src={userData.profileImage || '/default-avatar.png'}
              alt="avatar"
              className="profile-avatar-large"
            />
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
            <p>India</p>
          </div>

          <div className="profile-details">
            {isEditing ? (
              <>
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} />

                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} />

                <label>Availability</label>
                <input name="availability" value={form.availability} onChange={handleChange} />

                <label>Profile Image URL</label>
                <input name="profileImage" value={form.profileImage} onChange={handleChange} />

                <label>Skills Offered</label>
                <textarea name="skillsOffered" value={Array.isArray(form.skillsOffered) ? form.skillsOffered.join(', ') : form.skillsOffered} onChange={handleChange} />

                <label>Skills Wanted</label>
                <textarea name="skillsWanted" value={Array.isArray(form.skillsWanted) ? form.skillsWanted.join(', ') : form.skillsWanted} onChange={handleChange} />

                <div className="checkbox-wrapper">
                  <label>
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={form.isPublic}
                      onChange={e => setForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                    />
                    Public Profile
                  </label>
                </div>

                <div className="button-group">
                  <button className="save-btn" onClick={handleUpdate}>Save</button>
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <table className="profile-table">
                <tbody>
                  <tr><td><strong>Name</strong></td><td>{userData.name}</td></tr>
                  <tr><td><strong>Role</strong></td><td>{userData.type}</td></tr>
                  <tr><td><strong>Email</strong></td><td>{userData.email}</td></tr>
                  <tr><td><strong>Availability</strong></td><td>{userData.availability}</td></tr>
                  <tr><td><strong>Skills Offered</strong></td><td>{Array.isArray(userData.skillsOffered) ? userData.skillsOffered.join(', ') : '—'}</td></tr>
                  <tr><td><strong>Skills Wanted</strong></td><td>{Array.isArray(userData.skillsWanted) ? userData.skillsWanted.join(', ') : '—'}</td></tr>
                  <tr><td><strong>Public Profile</strong></td><td>{userData.isPublic ? 'Yes' : 'No'}</td></tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
