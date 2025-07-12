import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Profile.css';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(true); // default to editing mode for profile creation
  const [form, setForm] = useState({
    name: '',
    availability: '',
    skillsOffered: '',
    skillsWanted: '',
    isPublic: true,
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:2211/api/users/getusers/${user._id}`);
        const data = res.data;
        console.log('Fetched user data:', data);
        const userObj = {
          ...data,
          skillsOffered: data.skillsOffered || [],
          skillsWanted: data.skillsWanted || []
        };
        setUserData(userObj);
        setForm({
          name: userObj.name || '',
          availability: userObj.availability || '',
          skillsOffered: Array.isArray(userObj.skillsOffered) ? userObj.skillsOffered.join(', ') : '',
          skillsWanted: Array.isArray(userObj.skillsWanted) ? userObj.skillsWanted.join(', ') : '',
          isPublic: userObj.isPublic,
        });
        setIsEditing(false);
      } catch (err) {
        console.error('User not found or incomplete, proceeding to profile setup.');
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
        name: form.name,
        availability: form.availability,
        skillsOffered: form.skillsOffered.split(',').map(s => s.trim()),
        skillsWanted: form.skillsWanted.split(',').map(s => s.trim()),
        isPublic: form.isPublic
      };

      const res = await axios.put(`http://localhost:2211/api/users/update/${user?._id}`, updatedForm);
      alert('Profile saved successfully!');
      setUserData(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="profile-tab-header">
          <button className="active-tab">Profile</button>
          {!isEditing && <button onClick={() => setIsEditing(true)}>Edit Profile</button>}
        </div>

        <div className="profile-tab-card">
          <div className="profile-sidebar">
            <img
              src={userData?.profileImage || '/default-avatar.png'}
              alt="avatar"
              className="profile-avatar-large"
            />
            <h3>{userData?.name || user.username}</h3>
            <p>{user.email}</p>
            <p>India</p>
          </div>

          <div className="profile-details">
            {isEditing ? (
              <>
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} />

                <label>Availability</label>
                <input name="availability" value={form.availability} onChange={handleChange} />

                <label>Skills Offered</label>
                <textarea name="skillsOffered" value={form.skillsOffered} onChange={handleChange} />

                <label>Skills Wanted</label>
                <textarea name="skillsWanted" value={form.skillsWanted} onChange={handleChange} />

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
                  <tr><td><strong>Name</strong></td><td>{userData?.name}</td></tr>
                  <tr><td><strong>Availability</strong></td><td>{userData?.availability}</td></tr>
                  <tr><td><strong>Skills Offered</strong></td><td>{Array.isArray(userData?.skillsOffered) ? userData.skillsOffered.join(', ') : '—'}</td></tr>
                  <tr><td><strong>Skills Wanted</strong></td><td>{Array.isArray(userData?.skillsWanted) ? userData.skillsWanted.join(', ') : '—'}</td></tr>
                  <tr><td><strong>Public Profile</strong></td><td>{userData?.isPublic ? 'Yes' : 'No'}</td></tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <footer className="profile-footer">
        <div className="footer-content">
          <p>© 2025 <strong>SkillSwap</strong>. All rights reserved.</p>
          <div className="footer-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
