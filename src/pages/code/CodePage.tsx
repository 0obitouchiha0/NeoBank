import axios from 'axios';
import clsx from 'clsx';
import React from 'react';
import { Navigate, useParams } from 'react-router';
import Layout from '../../components/Layout/Layout';
import { confirmCode, deleteApplication } from '../../store/slices/applicationSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import styles from './styles.module.scss';
import offerImg from '../../assets/common/offer.png';
import Notification from '../../components/Notification/Notification';
import { Link } from 'react-router-dom';

let currentIndex = 0;

function CodePage() {
    const {applicationId: stateApplicationId, stage} = useAppSelector(state => state.application);
    const {applicationId} = useParams();
    const numberApplicationId = Number(applicationId);
    if(numberApplicationId !== stateApplicationId || stage < 5) return <Navigate to={'/loan'}/>;

    const dispatch = useAppDispatch();

    const [pin, setPin] = React.useState(['', '', '', '']); 
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isValid, setIsValid] = React.useState(true);
    const inputRef = React.useRef<HTMLInputElement>(null);

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const newPin = [...pin];
        newPin[currentIndex] = value.substring(value.length - 1);

        if(!value && currentIndex !== 0) setActiveIndex(currentIndex - 1);
        else if(value) setActiveIndex(currentIndex + 1);

        setPin(newPin);
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if(e.key === 'Backspace' || !isNaN(Number(e.key))) {
            currentIndex = index;
            if(e.key === 'Backspace' && index !== 0) {
                setActiveIndex(currentIndex - 1);
            }
        }
        else e.preventDefault();
    }

    function finishApplication() {
        dispatch(deleteApplication());
    }

    React.useEffect(() => {
        inputRef.current?.focus();
    }, [activeIndex]);

    React.useEffect(() => {
        const pinStr = pin.join('');
        if(pinStr.length === 4) {
            axios.post(`http://localhost:8080/document/${applicationId}/sign/code`, pinStr, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(() => {
                    setIsValid(true);
                    dispatch(confirmCode());
                })
                .catch(() => {
                    setIsValid(false);
                });
        }
    }, [pin]);

    return (
        <Layout>
            {stage === 5
                ? <div className={styles.container}>
                    <h1 className={styles.container__title}>Please enter confirmation code</h1>
                    <div className={styles.container__inputs}>
                        {pin.map((v, index) => (
                            <div key={index} className={clsx(styles.input__container, pin[index] === '' && index !== activeIndex && styles.empty)}>
                                <input
                                    ref={index === activeIndex ? inputRef : null}
                                    type="number"
                                    onChange={onChangeHandler}
                                    onKeyDown={e => onKeyDownHandler(e, index)}
                                    value={pin[index]}
                                    required={true}
                                />
                            </div>
                        )) }
                    </div>
                    {!isValid && <p className={styles.container__error}>Invalid confirmation code</p>}
                </div>
                : <div className={styles.congratulations}>
                    <img src={offerImg} alt="offer" />
                    <Notification title={'Congratulations! You have completed your new credit card.'} description={'Your credit card will arrive soon. Thank you for choosing us!'} />
                    <Link to="/" className={styles.congratulations__link} onClick={finishApplication}>View other offers of our bank</Link>
                </div>}
        </Layout>
    );
}
export default CodePage;