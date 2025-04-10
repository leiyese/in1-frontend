import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import UserTextInput from '../components/UserTextInput';
import { registerUser } from '../services/userApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [serverMessage, setServerMessage] = useState("");

    const onSubmit = async (data) => {
        console.log("Register data:", data);

        try {
            const response = await registerUser(data); // Call the API with the form data
            setServerMessage({ type: "success", text: response.message });
            reset(); // Reset the form fields

            // Navigate to the login page with a success message
            navigate('/login', { state: { successMessage: "Registration successful! Please log in." } });
        } catch (error) {
            console.log(data); // Log data in case of error to debug
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "Registration failed!",
            });
        }
    };

    const navigate = useNavigate();

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
                <h2 style={{ marginBottom: "1rem" }}>Register User</h2>
                {serverMessage && (
                    <p style={{ marginBottom: "1rem" }}>{serverMessage.text}</p>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}  // Handle form submission
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "400px",
                    }}
                >
                    <UserTextInput
                        name="username"
                        label="Username"
                        register={register}  // Pass register function here
                        registerOptions={{ required: "Username is required" }}  // Validation rule
                        error={errors.username}  // Display error message if there's any
                    />
                    <UserTextInput
                        name="password"
                        label="Password"
                        type="password"
                        register={register}  // Pass register function here
                        registerOptions={{ required: "Password is required" }}  // Validation rule
                        error={errors.password}  // Display error message if there's any
                    />
                    <UserTextInput
                        name="email"
                        label="Email"
                        register={register}  // Pass register function here
                        registerOptions={{ required: "Email is required" }}  // Validation rule
                        error={errors.email}  // Display error message if there's any
                    />
                    <div style={{ marginTop: "1rem" }}>
                        <Button type="submit">Register User</Button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterUser;
