import React, { useEffect, useState } from 'react';
import { fetchSubscriptionTypes, createUserSubscription, deleteUserSubscription, getUserSubscription} from '../services/SubscriptionApi';
import { getProtectedData } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/SubscriptionCard';
import Header from '../components/Header';
import styles from '../styles/SubscriptionCard.module.css';
import AnnoyingCancelButton from '../components/AnnoyingCancelButton';
import axiosInstance from '../services/axiosInstance';

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
                
                // Use the dedicated endpoint to get user's subscription
                try {
                    const userSubscription = await getUserSubscription(userData.logged_in_as);
                    if (userSubscription) {
                        console.log("Found user subscription:", userSubscription);
                        setCurrentSubscription(userSubscription);
                    } else {
                        console.log("User has no active subscription");
                        setCurrentSubscription(null);
                    }
                } catch (err) {
                    console.error("Error fetching user subscription:", err);
                }
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
        
        try {
            // Use the same function for both creating and updating
            const response = await createUserSubscription(subscriptionId, userId);
            setServerMessage({
                type: "success",
                text: response.message
            });
            // Update the current subscription with the response
            setCurrentSubscription(response);
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "An error occurred"
            });
        }
    };

    const handleCancelSubscription = async () => {
        if (!currentSubscription) {
            console.error("No current subscription to cancel");
            return;
        }
        
        console.log("Attempting to cancel subscription:", currentSubscription); // Debug log
        
        // Make sure we have a valid subscription id
        if (!currentSubscription.id) {
            setServerMessage({
                type: "error",
                text: "Cannot cancel subscription: Missing subscription ID"
            });
            return;
        }
        
        try {
            const response = await deleteUserSubscription(currentSubscription.id);
            console.log("Cancellation response:", response);
            setServerMessage({
                type: "success",
                text: response.message || "Subscription cancelled successfully."
            });
            setCurrentSubscription(null);
        } catch (error) {
            console.error("Error cancelling subscription:", error);
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