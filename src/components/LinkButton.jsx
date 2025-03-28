import clsx from 'clsx'; // Optional, for clean class merging
import { Link } from "react-router-dom";
import styles from '../styles/LinkButton.module.css';

const LinkButton = ({ to, className = '', children, ...props }) => {
  return (
    <Link
      to={to}
      className={clsx(styles.linkButton, className)} // Merges classes safely
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;