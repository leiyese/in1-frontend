import React from 'react';
import styles from '../styles/SubscriptionCard.module.css';

const SubscriptionCard = ({ subscription, onSelect }) => {
    return (
        <div className={styles.card} onClick={() => onSelect(subscription.id)}>
            <h3 className={styles.title}>{subscription.type}</h3>
            <p className={styles.price}>Price: ${subscription.price}</p>
        </div>
    );
};

export default SubscriptionCard;