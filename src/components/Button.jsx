import clsx from 'clsx'; // Optional, makes class merging cleaner
import styles from '../styles/Button.module.css';

const Button = ({ onClick, className = '', children, type = 'submit', ...props }) => {
  return (
    <button
      type={type} // Ensures the button has a default type
      onClick={onClick}
      className={clsx(styles.button, className)} // Merges classes safely
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;