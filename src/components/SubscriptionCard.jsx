import React from 'react';
import styles from '../styles/SubscriptionCard.module.css';

const SubscriptionCard = ({ subscription, onSubscribe }) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.title}>{subscription.type}</h3>
                <p className={styles.price}>Price: ${subscription.price}</p>
            </div>
            <button className={styles.subscribeButton} onClick={() => onSubscribe(subscription.id)}>
                Subscribe
            </button>
        </div>
    );
};

export default SubscriptionCard;