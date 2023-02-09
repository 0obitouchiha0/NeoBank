import React from 'react';
import styles from './styles.module.scss';

interface NotificationProps {
    title: string,
    description: string
}

function Notification({title, description}: NotificationProps) {
    return (
        <div className={styles.notification}>
            <h1 className={styles.notification__title}>{title}</h1>
            <p className={styles.notification__description}>{description}</p>
        </div>
    );
}

export default Notification;