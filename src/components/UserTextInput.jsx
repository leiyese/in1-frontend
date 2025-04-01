import clsx from "clsx";
import React from "react";
import styles from "../styles/TextInput.module.css";

const UserTextInput = ({
  name,
  label,
  register,
  registerOptions = {}, // Validation options like required
  error,
  className = "",
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
        {...register(name, registerOptions)}  // Register the field with react-hook-form
        className={clsx(styles.input, className)}
        {...props}
      />
      {error && <p className={styles.error}>{error.message}</p>}  {/* Display validation error */}
    </div>
  );
};

export default UserTextInput;
