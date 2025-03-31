import React, { useEffect, useState } from 'react';
import { fetchSubscriptionTypes, createUserSubscription } from '../services/SubscriptionApi';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/SubscriptionCard';
import Header from '../components/Header'; // Import Header component
import styles from '../styles/SubscriptionCard.module.css';

const Subscription = () => {
    const [serverMessage, setServerMessage] = useState("");
    const [subscriptionTypes, setSubscriptionTypes] = useState([]);
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
                    text: "Failed to load subscription types."
                });
            }
        };
        loadSubscriptionTypes();
    }, []);

    const handleSubscribe = async (subscriptionId) => {
        const dummyUserId = 1;
        try {
            const response = await createUserSubscription(subscriptionId, dummyUserId);
            setServerMessage({
                type: "success",
                text: response.message
            });
            navigate("/");
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "An error occurred"
            });
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: '1', padding: '20px' }}>
                <h2 style={{ textAlign: 'center' }}>Choose a subscription plan</h2>
                {serverMessage && <p>{serverMessage.text}</p>}
                <div className={styles.container}>
                    {subscriptionTypes.map((type) => (
                        <SubscriptionCard
                            key={type.id}
                            subscription={type}
                            onSubscribe={handleSubscribe}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Subscription;