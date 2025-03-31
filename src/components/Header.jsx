import React from 'react';
import styles from '../styles/Header.module.css';
import Button from './Button';
import logoImage from '../assets/logo_in1.jpg'; // Adjust the path to your logo image

const Header = ({ onProfileClick, onLogoutClick, onSubcriptionClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
            <img src={logoImage} alt="Company Logo" className={styles.logo} />
            <span>In1</span> {/* Optional: Add your company name */}
          </div>
        
        <div className={styles.buttonsContainer}>
        <Button
            onClick={onSubcriptionClick}
            variant="primary"
            >
              Subscribe
            </Button>

          <Button 
            onClick={onProfileClick}
            variant="primary"
          >
            Profile
          </Button>

          <Button 
            onClick={onLogoutClick}
            variant="danger"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;