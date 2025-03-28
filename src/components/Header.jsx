import React from 'react';
import styles from '../styles/Header.module.css';
import Button from './Button';
import Logo from './Logo';

const Header = ({ onProfileClick, onLogoutClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo />
        
        <div className={styles.buttonsContainer}>
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