import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../services/authApi';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [serverMessage, setServerMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await login(data)
            setServerMessage({ type: "success", text: response.message });
            navMainMenu()
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "An error occurred",
            })
        }
    }

    const navMainMenu = () => {
        navigate("/");
    };

    return (
        <div>
        <h2>Login</h2>
        {serverMessage && (
            <p>{serverMessage.text}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text"
            name="username"
            label="Username"
            register={register}
            registerOptions={{ required: "Username is required" }}
            error={errors.username}
            />
            <br/>
            <input type="password"
            name="password"
            label="Password"
            register={register}
            registerOptions={{ required: "Password is required" }}
            error={errors.password}
            />
            <br/>
            <button type="submit">Login</button>
        </form>
        <a href="/">Main Menu</a>
        </div>
    )
}

export default Login;