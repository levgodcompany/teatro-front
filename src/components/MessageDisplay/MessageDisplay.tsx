import React from 'react';
import styles from './MessageDisplay.module.css';

interface MessageDisplayProps {
    message: string;
    type: 'success' | 'error' | 'info';
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message, type }) => {
    const getMessageClass = () => {
        switch (type) {
            case 'success':
                return styles.success;
            case 'error':
                return styles.error;
            case 'info':
                return styles.info;
            default:
                return '';
        }
    };

    return (
        <div className={`${styles.message} ${getMessageClass()}`}>
            {message}
        </div>
    );
};

export default MessageDisplay;
