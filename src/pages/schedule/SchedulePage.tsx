import axios from 'axios';
import React from 'react';
import Checkbox from '../../components/Checkbox/Checkbox';
import Layout from '../../components/Layout/Layout';
import Table from '../../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../store/store';
import DenyModal from './components/DenyModal/DenyModal';
import styles from './styles.module.scss';
import Notification from '../../components/Notification/Notification';
import { confirmPaymentSchedule } from '../../store/slices/applicationSlice';
import AllowStageHOC from '../../components/AllowStageHOC/AllowStageHOC';

export type payment = {
    number: number,
    date: string,
    totalPayment: number,
    interestPayment: number,
    debtPayment: number,
    remainingDebt: number
}

function Schedule() {
    const {applicationId, stage} = useAppSelector(state => state.application);

    const [paymentSchedule, setPaymentSchedule] = React.useState<payment[]>([]);
    const [isChecked, setIsChecked] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        axios.get(`http://localhost:8080/admin/application/${applicationId}`)
            .then(res => res.data)
            .then(res => {
                setPaymentSchedule(res.credit?.paymentSchedule);
            });
    }, []);

    function openModalHandler() {
        setIsModalOpen(true);
    }

    function closeModalHandler() {
        setIsModalOpen(false);
    }

    function checkboxOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(e.target.checked);
    }

    function sendApplicationHandler() {
        setIsModalOpen(false);
        dispatch(confirmPaymentSchedule(Number(applicationId)));
    }

    return (
        <Layout>
            <>
                {stage === 3
                    ? <div className={styles.container}>
                        <div className={styles.title}>
                            <h1 className={styles.title__tableName}>Payment Schedule</h1>
                            <span className={styles.title__step}>Step 3 of 5</span>
                        </div>
                        <Table table={paymentSchedule}/>
                        <div className={styles.decision}>
                            <button className={styles.decision__denyBtn} onClick={openModalHandler}>Deny</button>
                            <div className={styles.decision__checkbox}>
                                <Checkbox checked={isChecked} onChange={checkboxOnChangeHandler} labelText={'I agree with the payment schedule'}/>
                            </div>
                            <button className={styles.decision__sendBtn} disabled={!isChecked} onClick={sendApplicationHandler}>Send</button>
                        </div>
                    </div>
                    : <div className={styles.notification__container}>
                        <Notification title={'Documents are formed'} description={'Documents for signing will be sent to your email'} />
                    </div>}
                {isModalOpen && <div data-testid="modal">
                    <DenyModal onClose={closeModalHandler} applicationId={Number(applicationId)}/>
                </div>}
            </>
        </Layout>
    );
}
const SchedulePage = () => <AllowStageHOC stage={3}><Schedule/></AllowStageHOC>;
export default SchedulePage;

export {Schedule};