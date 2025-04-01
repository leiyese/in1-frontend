import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Button from '../components/Button';
import UserTextInput from '../components/UserTextInput';
import Footer from '../components/Footer';
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
        try {
            const response = await login(data);
            setServerMessage({ type: "success", text: response.message });
            navigate("/"); // Navigate to the main menu on success
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "An error occurred",
            });
        }
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
                <UserTextInput
                label="Username"
                name="username"
                type="text"
                register={register}  // Pass register function here
                registerOptions={{ required: "Username is required" }}
                error={errors.username}
                />
                <UserTextInput
                label="Password"
                name="password"
                type="password"
                register={register}  // Pass register function here
                registerOptions={{ required: "Password is required" }}
                error={errors.password}
                />
                    <div style={{ marginTop: "1rem" }}>
                        <Button type="submit">Login</Button>
                    </div>
                </form>
                {serverMessage && (
                    <div
                        style={{
                            marginTop: "1rem",
                            color: serverMessage.type === "success" ? "green" : "red",
                        }}
                    >
                        {serverMessage.text}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Login;
