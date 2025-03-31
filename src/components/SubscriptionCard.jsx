import React from 'react';
import styles from '../styles/SubscriptionCard.module.css';

const SubscriptionCard = ({ subscription, onSubscribe }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{subscription.type}</h3>
            <p className={styles.price}>Price: ${subscription.price}</p>
            <button onClick={() => onSubscribe(subscription.id)}>Subscribe</button>
        </div>
    );
};

export default SubscriptionCard;