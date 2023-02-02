import React from 'react';

import styles from './styles.module.scss';
import envelopeImg from '../../../../assets/pagesImages/homePage/envelope.svg';
import arrowImg from '../../../../assets/pagesImages/homePage/arrow.svg';
import axios from 'axios';

function SubscriptionField() {
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const [emailFieldValue, setEmailFieldValue] = React.useState('');

    React.useEffect(() => {
        const localStorageIsSubscribedFlag = !!localStorage.getItem('isSubscribed');
        setIsSubscribed(localStorageIsSubscribedFlag);
    }, []);

    function subscribeHandler() {
        const data = new FormData();
        data.append('email', emailFieldValue);
        if(!isSubscribed) {
            axios.post('http://localhost:8080/email', data).then(() => {
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
                <input type="text" placeholder="Your email" className={styles.input__field} value={emailFieldValue} onChange={inputOnChangeHandler}/>
                <button className={styles['input-button']} onClick={subscribeHandler}>
                    <img src={arrowImg} alt="arrow" className={styles['input-button__icon']}/>
                    <span className={styles['input-button__text']}>Subscribe</span>
                </button>
            </div>);
    }
    return <h1>{'You are already subscribed to the bank\'s newsletter'}</h1>;
}

export default SubscriptionField;