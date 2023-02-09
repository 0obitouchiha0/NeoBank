import React from 'react';
import { Navigate, useParams } from 'react-router';
import Layout from '../../components/Layout/Layout';
import { useAppSelector } from '../../store/store';
import ContinuationForm from './components/ContinuationForm/ContinuationForm';
import Notification from '../../components/Notification/Notification';
import styles from './styles.module.scss';

function LoanContinuation() {
    const {applicationId: stateApplicationId, stage} = useAppSelector(state => state.application);
    const {applicationId} = useParams();
    const numberApplicationId = Number(applicationId);

    if(numberApplicationId !== stateApplicationId || stage < 2) return <Navigate to={'/loan'}/>;
    return (
        <Layout>
            {stage === 2
                ? <div className={styles.container}>
                    <div className={styles.title}>
                        <h1 className={styles.title__formName}>Continuation of the application</h1>
                        <span className={styles.title__step}>Step 2 of 5</span>
                    </div>
                    <ContinuationForm applicationId={stateApplicationId}/>
                </div>
                : <div className={styles.notification__container}>
                    <Notification title={'Wait for a decision on the application'} description={'The answer will come to your mail within 10 minutes'}/>
                </div>}
        </Layout>
    );
}

export default LoanContinuation;