import React from 'react';
import styles from '../styles/TextInput.module.css';

const TextInput = ({ 
  name, 
  label, 
  type = "text", 
  register, 
  registerOptions = {}, 
  error, 
  disabled = false,
  autoComplete = "off"
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`${styles.input} ${error ? styles.error : ''}`}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register(name, registerOptions)}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default TextInput;
