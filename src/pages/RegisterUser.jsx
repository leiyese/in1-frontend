import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import styles from '../styles/RegisterUser.module.css';

const RegisterUser = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle registration logic
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextInput
          name="name"
          label="Full Name"
          value={watch('name') || ''}
          onChange={(e) => setValue('name', e.target.value)}
          registerOptions={{ required: "Name is required" }}
          error={errors.name}
        />

        <TextInput
          name="email"
          label="Email"
          value={watch('email') || ''}
          onChange={(e) => setValue('email', e.target.value)}
          registerOptions={{ 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          error={errors.email}
        />

        <TextInput
          name="password"
          label="Password"
          type="password"
          value={watch('password') || ''}
          onChange={(e) => setValue('password', e.target.value)}
          registerOptions={{ 
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          }}
          error={errors.password}
        />

        <TextInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={watch('confirmPassword') || ''}
          onChange={(e) => setValue('confirmPassword', e.target.value)}
          registerOptions={{ 
            required: "Please confirm your password",
            validate: value => 
              value === watch('password') || "Passwords don't match"
          }}
          error={errors.confirmPassword}
        />

        <Button type="submit" variant="primary" className={styles.submitButton}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterUser;