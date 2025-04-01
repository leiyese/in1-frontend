import React, { useEffect, useState } from 'react';
import { fetchSubscriptionTypes, createUserSubscription, updateUserSubscription, deleteUserSubscription } from '../services/SubscriptionApi';
import { getProtectedData } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/SubscriptionCard';
import Header from '../components/Header';
import styles from '../styles/SubscriptionCard.module.css';
import AnnoyingCancelButton from '../components/AnnoyingCancelButton';

const Subscription = () => {
    const [serverMessage, setServerMessage] = useState("");
    const [subscriptionTypes, setSubscriptionTypes] = useState([]);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [currentSubscription, setCurrentSubscription] = useState(null);
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
                    error: error.message
                });
            }
        };

        const fetchUser = async () => {
            try {
                const userData = await getProtectedData();
                setUserId(userData.logged_in_as);
                setUsername(userData.username);
            } catch (error) {
                console.error("User not logged in", error);
            }
        };

        loadSubscriptionTypes();
        fetchUser();
    }, []);

    const handleSelectSubscription = async (subscriptionId) => {
        if (!userId) {
            setServerMessage({
                type: "error",
                text: "You must be logged in to subscribe."
            });
            return;
        }
        // If there's no active subscription, create one.
        if (!currentSubscription) {
            try {
                const response = await createUserSubscription(subscriptionId, userId);
                setServerMessage({
                    type: "success",
                    text: response.message
                });
                // Assume response includes subscriptions_type_id along with other subscription data
                setCurrentSubscription(response);
            } catch (error) {
                setServerMessage({
                    type: "error",
                    text: error.response?.data?.error || "An error occurred"
                });
            }
        } else {
            // If the selected type is different from the current one, update.
            if (currentSubscription.subscriptions_type_id !== subscriptionId) {
                try {
                    const response = await updateUserSubscription(subscriptionId, {
                        date: new Date().toISOString(),
                        subscriptions_type_id: subscriptionId,
                        user_id: userId
                    });
                    setServerMessage({
                        type: "success",
                        text: response.message
                    });
                    setCurrentSubscription(response);
                } catch (error) {
                    setServerMessage({
                        type: "error",
                        text: error.response?.data?.error || "Update failed"
                    });
                }
            }
        }
    };

    const handleCancelSubscription = async () => {
        if (!currentSubscription) return;
        try {
            const response = await deleteUserSubscription(currentSubscription.id);
            setServerMessage({
                type: "success",
                text: response.message || "Subscription cancelled successfully."
            });
            setCurrentSubscription(null);
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "Failed to cancel subscription."
            });
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            {userId && (
                <div style={{ backgroundColor: '#f1f1f1', padding: '10px', textAlign: 'center' }}>
                    Logged in as: {username}
                </div>
            )}
            <main style={{ flex: '1', padding: '20px' }}>
                <h2 style={{ textAlign: 'center' }}>Choose a subscription plan</h2>
                {serverMessage && <p>{serverMessage.text}</p>}
                {currentSubscription && (
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h3>Your Current Subscription</h3>
                        <AnnoyingCancelButton 
                            onClick={handleCancelSubscription}
                        >
                            Cancel Subscription
                        </AnnoyingCancelButton>
                    </div>
                )}
                <div className={styles.container}>
                    {subscriptionTypes.map((type) => (
                        <SubscriptionCard
                            key={type.id}
                            subscription={type}
                            currentSubscription={currentSubscription}
                            onSubscribe={handleSelectSubscription}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Subscription;