import React from 'react';
import styles from '../styles/Footer.module.css';
import LinkButton from './LinkButton';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.aboutLink}>
          <LinkButton to="/about" className={styles.link}>
            About
          </LinkButton>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} AI Assistant App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;