import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { registerUser } from '../services/userApi';
import styles from '../styles/RegisterUser.module.css';


const RegisterUser = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
  
    const [serverMessage, setServerMessage] = useState("")
  
    const onSubmit = async (data) => {
      try {
        const response = await registerUser(data)
        setServerMessage({ type: "register user: success", text: response.message })
        reset()
      } catch (error) {
        setServerMessage({
          type: "error",
          text: error.response?.data?.error || "Something went wrong!",
        })
      }
    }
  
    return (
      <div className={styles.formContainer}>
      <h2>Register User</h2>
      {serverMessage && (
        <p>{serverMessage.text}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="username"
          label="Username"
          register={register}
          registerOptions={{ required: "Username is required" }}
          error={errors.username}
        />
        <TextInput
          name="password"
          label="Password"
          register={register}
          registerOptions={{ required: "Password is required" }}
          error={errors.password}
        />
        <TextInput
          name="email"
          label="Email"
          register={register}
          registerOptions={{ required: "Email is required" }}
          error={errors.email}
        />
        <Button type="submit">Register User</Button>
      </form>
      <LinkButton to='/'>Main Menu</LinkButton>
    </div>
    )
  }
  
  export default RegisterUser