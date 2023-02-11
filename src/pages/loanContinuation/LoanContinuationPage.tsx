import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAppSelector } from '../../store/store';
import ContinuationForm from './components/ContinuationForm/ContinuationForm';
import Notification from '../../components/Notification/Notification';
import styles from './styles.module.scss';
import AllowStageHOC from '../../components/AllowStageHOC/AllowStageHOC';

function LoanContinuation() {
    const {applicationId, stage} = useAppSelector(state => state.application);
    return (
        <Layout>
            {stage === 2
                ? <div className={styles.container}>
                    <div className={styles.title}>
                        <h1 className={styles.title__formName}>Continuation of the application</h1>
                        <span className={styles.title__step}>Step 2 of 5</span>
                    </div>
                    <ContinuationForm applicationId={Number(applicationId)}/>
                </div>
                : <div className={styles.notification__container}>
                    <Notification title={'Wait for a decision on the application'} description={'The answer will come to your mail within 10 minutes'}/>
                </div>}
        </Layout>
    );
}

const LoanContinuationPage = () => <AllowStageHOC stage={2}><LoanContinuation/></AllowStageHOC>;
export default LoanContinuationPage;

export {LoanContinuation};