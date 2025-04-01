import React from 'react';
import styles from '../styles/SubscriptionCard.module.css';

const SubscriptionCard = ({ subscription, onSubscribe, currentSubscription }) => {
    // Check if the current subscription matches this subscription type.
    const isCurrent = currentSubscription && currentSubscription.subscriptions_type_id === subscription.id;
    const buttonText = isCurrent
        ? "Current"
        : currentSubscription
            ? `Switch to ${subscription.type}`
            : "Subscribe";

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.title}>{subscription.type}</h3>
                <p className={styles.price}>Price: ${subscription.price}</p>
            </div>
            <button
                className={styles.subscribeButton}
                onClick={() => onSubscribe(subscription.id)}
                disabled={isCurrent}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default SubscriptionCard;