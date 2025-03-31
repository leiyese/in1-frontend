import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchSubscriptionTypes, createUserSubscription } from '../services/SubscriptionApi';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/SubscriptionCard';
import styles from '../styles/SubscriptionCard.module.css';

const Subscription = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverMessage, setServerMessage] = useState("");
    const [subscriptionTypes, setSubscriptionTypes] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadSubscriptionTypes = async () => {
            try {
                const data = await fetchSubscriptionTypes();
                console.log("Fetched subscription types:", data);
                setSubscriptionTypes(data.subscriptionTypes || data);
            } catch (error) {
                setServerMessage({
                    type: "error",
                    text: "Failed to load subscription types.",
                });
            }
        };
        loadSubscriptionTypes();
    }, []);

    const onSelectSubscription = (id) => {
        setSelectedSubscription(id);
    };

    const onSubmit = async (data) => {
        // Use a dummy user id until auth is set up
        const dummyUserId = 1;
        try {
            const response = await createUserSubscription(selectedSubscription, dummyUserId);
            setServerMessage({
                type: "success",
                text: response.message,
            });
            navigate("/");
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "An error occurred",
            });
        }
    };

    return (
        <div>
            <h2>Subscription</h2>
            {serverMessage && <p>{serverMessage.text}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container}>
                    {subscriptionTypes.map((type) => (
                        <SubscriptionCard
                            key={type.id}
                            subscription={type}
                            onSelect={onSelectSubscription}
                        />
                    ))}
                </div>
                {errors.subscription && <span>{errors.subscription.message}</span>}
                <br />
                <button type="submit" disabled={!selectedSubscription}>Subscribe</button>
            </form>
            <a href="/">Main Menu</a>
        </div>
    );
};

export default Subscription;