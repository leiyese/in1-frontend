import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import AdvTextInput from '../components/AdvTextInput';
import { registerUser } from '../services/userApi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [serverMessage, setServerMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);
            setServerMessage({ type: "success", text: response.message });
            reset();
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "Something went wrong!",
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
                <h2 style={{ marginBottom: "1rem" }}>Register User</h2>
                {serverMessage && (
                    <p style={{ marginBottom: "1rem" }}>{serverMessage.text}</p>
                )}
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
                        name="username"
                        label="Username"
                        register={register}
                        registerOptions={{ required: "Username is required" }}
                        error={errors.username}
                    />
                    <AdvTextInput
                        name="password"
                        label="Password"
                        register={register}
                        registerOptions={{ required: "Password is required" }}
                        error={errors.password}
                    />
                    <AdvTextInput
                        name="email"
                        label="Email"
                        register={register}
                        registerOptions={{ required: "Email is required" }}
                        error={errors.email}
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