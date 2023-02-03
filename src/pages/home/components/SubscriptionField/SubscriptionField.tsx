import React from 'react';

import styles from './styles.module.scss';
import envelopeImg from '../../../../assets/pagesImages/homePage/envelope.svg';
import arrowImg from '../../../../assets/pagesImages/homePage/arrow.svg';
import axios from 'axios';

function SubscriptionField() {
    const [isSubscribed, setIsSubscribed] = React.useState(!!localStorage.getItem('isSubscribed'));
    const [emailFieldValue, setEmailFieldValue] = React.useState('');

    function subscribeHandler() {
        if(!isSubscribed) {
            axios.post('http://localhost:8080/email', emailFieldValue).then(() => {
                localStorage.setItem('isSubscribed', 'true');
                setIsSubscribed(true);
            });
        }
    }

    function inputOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailFieldValue(e.target.value);
    }

    if(!isSubscribed) {
        return (
            <div className={styles.input}>
                <img src={envelopeImg} alt="envelope" className={styles.input__icon}/>
                <input type="email" placeholder="Your email" className={styles.input__field} value={emailFieldValue} onChange={inputOnChangeHandler}/>
                <button className={styles['input-button']} onClick={subscribeHandler}>
                    <img src={arrowImg} alt="arrow" className={styles['input-button__icon']}/>
                    <span className={styles['input-button__text']}>Subscribe</span>
                </button>
            </div>);
    }
    return <h1>{'You are already subscribed to the bank\'s newsletter'}</h1>;
}

export default SubscriptionField;