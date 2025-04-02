import React, { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';
import Button from './Button';
import logoImage from '../assets/logo_in1.jpg';
import { getProtectedData, logout } from '../services/authApi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await getProtectedData();
        setIsLoggedIn(true);
        setUser(userData);
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
        console.log("Authentication error:", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Call the API to log out
      setIsLoggedIn(false); // Update state
      setUser(null);
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = () => {
    if (!user || !user.username) return '?';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <div 
            className={styles.logoLink}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={() => navigate('/')}
          >
            <div className={`${styles.logoWrapper} ${logoHovered ? styles.logoHovered : ''}`}>
              <img src={logoImage} alt="Company Logo" className={styles.logo} />
              <div className={styles.logoGlow}></div>
            </div>
          </div>
          {/* Home button removed - logo now serves this purpose */}
        </div>
        
        {/* Combined buttons section */}
        <div className={styles.buttonsSection}>
          <div className={styles.navButtons}>
            <Button onClick={() => navigate('/about')} variant="nav">About</Button>
            <Button onClick={() => navigate('/subscription')} variant="nav">Pricing</Button>
          </div>
          
          <div className={styles.buttonsContainer}>
          {isLoggedIn ? (
              <>
                <div className={styles.userProfile} onClick={() => navigate('/profile-page')}>
                  <div className={styles.avatar}>
                    {getUserInitials()}
                  </div>
                  <span className={styles.userName}>{user?.username}</span>
                </div>
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
      </div>
    </header>
  );
};

export default Header;