import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import Footer from '../../Footer/Footer.jsx';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-content">
        <div className="home-wrapper">
          <div className="welcome-message">
            <h1>
              Welcome to <span className="user-name">SkillSwap</span>,{' '}
              <span className="user-name">{user?.username || 'User'}</span> 👋
            </h1>
          </div>

          <div className="description-box">
            <p>
              <span>SkillSwap</span> is a community-driven platform where users can exchange skills with one another.
              Whether you want to learn graphic design, practice a new language, or improve your coding skills,
              SkillSwap connects you with people offering what you want and seeking what you offer.
              <br /><br />
              Build your profile, browse others, and start swapping knowledge today.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
