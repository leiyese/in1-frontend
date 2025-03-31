import clsx from "clsx";
import React from "react";
import styles from "../styles/TextInput.module.css";

const AdvTextInput = ({ 
  name, 
  label, 
  value,
  onChange,
  className = "",
  error,
  as = "input",
  ...props 
}) => {
  const InputComponent = as;
  
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <InputComponent
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={clsx(styles.input, className)}
        {...props}
      />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default AdvTextInput;