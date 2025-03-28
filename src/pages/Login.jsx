import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../services/authApi';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [serverMessage, setServerMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("login data:", data); // Log the form data

        try {
            const response = await login(data);
            setServerMessage({ type: "success", text: response.message });
            navMainMenu();
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "An error occurred",
            });
        }
    };

    const navMainMenu = () => {
        navigate("/user-info");
    };

    return (
        <div>
            <h2>Login</h2>
            {serverMessage && (
                <p>{serverMessage.text}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    {...register("username", { required: "Username is required" })} // Register input
                />
                {errors.username && <span>{errors.username.message}</span>}
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })} // Register input
                />
                {errors.password && <span>{errors.password.message}</span>}
                <br />

                <button type="submit">Login</button>
            </form>
            <a href="/">Main Menu</a>
        </div>
    );
};

export default Login;
