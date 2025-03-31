import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login, logout } from '../services/authApi';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Button from '../components/Button';
import AdvTextInput from '../components/AdvTextInput';
import Footer from '../components/Footer';

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
        navigate("/");
    };
    const handleProfileClick = () => {
        navigate('/profile-page');
        console.log('Profile clicked');
    };

    const handleSubcriptionClick = () => {
        navigate('/subscription');
        console.log('Subscription clicked');
        const userId = localStorage.getItem('userId') || 'unknown'; 
        console.log('Current user id:', userId);
    }

    
    const handleLogoutClick = async () => {
        try {
        await logout();
        console.log('Logout successful');
        navigate('/login');
        } catch (error) {
        console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <Header
                onProfileClick={handleProfileClick} 
                onLogoutClick={handleLogoutClick} 
                onSubcriptionClick={handleSubcriptionClick}
            />
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdvTextInput
                        label="Username"
                        name="username"
                        type="username"
                        {...register("username", { required: "Username is required" })}
                        error={errors.username}
                    />
                    <AdvTextInput
                        label="Password"
                        name="password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        error={errors.password}
                    />
                    <Button type="submit">Login</Button>
                </form>
                {serverMessage && (
                    <div className={`message ${serverMessage.type}`}>
                        {serverMessage.text}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Login;
