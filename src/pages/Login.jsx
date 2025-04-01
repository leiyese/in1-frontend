import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import AdvTextInput from '../components/AdvTextInput';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { login } from '../services/authApi';

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

    return (
        <div>
            <Header />
            <div
                className="container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh",
                    textAlign: "center",
                }}
            >
                <h1 style={{ marginBottom: "1rem" }}>Login</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "400px",
                    }}
                >
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
                    <div style={{ marginTop: "1rem" }}>
                        <Button type="submit">Login</Button>
                    </div>
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
