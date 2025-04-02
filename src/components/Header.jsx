import React from 'react';
import styles from '../styles/Header.module.css';
import Button from './Button';
import logoImage from '../assets/logo_in1.jpg'; // Adjust the path to your logo image
import { getProtectedData, logout } from '../services/authApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await getProtectedData();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.log("Authentication error:", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Call the API to log out
      setIsLoggedIn(false); // Update state
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <a href="/">
            <img src={logoImage} alt="Company Logo" className={styles.logo} />
            <Button onClick={() => navigate('/')} variant="primary">Home</Button>
            </a>
          </div>
        
        <div className={styles.buttonsContainer}>
        {isLoggedIn ? (
            <>
              <Button onClick={() => navigate('/subscription')} variant="primary">
                Subscribe
              </Button>
              <Button onClick={() => navigate('/profile-page')} variant="primary">
                Profile
              </Button>
              <Button onClick={handleLogout} variant="danger">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} variant="primary">
                Login
              </Button>
              <Button onClick={() => navigate('/register-user')} variant="primary">
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;