import clsx from 'clsx';
import styles from '../styles/Button.module.css';

const Button = ({ 
  onClick, 
  className = '', 
  children, 
  type = 'button',
  variant = 'primary',
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;