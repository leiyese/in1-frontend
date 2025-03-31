import React from 'react';
import styles from '../styles/MessageDisplay.module.css';

const MessageDisplay = ({ messages }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`${styles.message} ${
            message.role === 'user' ? styles.userMessage : styles.assistantMessage
          }`}
        >
          <div className={styles.messageContent}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;