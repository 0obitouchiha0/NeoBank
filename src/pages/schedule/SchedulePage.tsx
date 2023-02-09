import axios from 'axios';
import React from 'react';
import { Navigate, useParams } from 'react-router';
import Checkbox from '../../components/Checkbox/Checkbox';
import Layout from '../../components/Layout/Layout';
import Table from '../../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../store/store';
import DenyModal from './components/DenyModal/DenyModal';
import styles from './styles.module.scss';
import Notification from '../../components/Notification/Notification';
import { confirmPaymentSchedule } from '../../store/slices/applicationSlice';

const a = [{'number':0,'date':'2023-02-08','totalPayment':0,'interestPayment':0,'debtPayment':0,'remainingDebt':359518.75},{'number':1,'date':'2023-03-08','totalPayment':16096.19,'interestPayment':2097.2,'debtPayment':13998.99,'remainingDebt':345519.76},{'number':2,'date':'2023-04-08','totalPayment':16096.19,'interestPayment':2015.54,'debtPayment':14080.65,'remainingDebt':331439.11},{'number':3,'date':'2023-05-08','totalPayment':16096.19,'interestPayment':1933.4,'debtPayment':14162.79,'remainingDebt':317276.32},{'number':4,'date':'2023-06-08','totalPayment':16096.19,'interestPayment':1850.78,'debtPayment':14245.41,'remainingDebt':303030.91},{'number':5,'date':'2023-07-08','totalPayment':16096.19,'interestPayment':1767.69,'debtPayment':14328.5,'remainingDebt':288702.41},{'number':6,'date':'2023-08-08','totalPayment':16096.19,'interestPayment':1684.1,'debtPayment':14412.09,'remainingDebt':274290.32},{'number':7,'date':'2023-09-08','totalPayment':16096.19,'interestPayment':1600.03,'debtPayment':14496.16,'remainingDebt':259794.16},{'number':8,'date':'2023-10-08','totalPayment':16096.19,'interestPayment':1515.47,'debtPayment':14580.72,'remainingDebt':245213.44},{'number':9,'date':'2023-11-08','totalPayment':16096.19,'interestPayment':1430.42,'debtPayment':14665.77,'remainingDebt':230547.67},{'number':10,'date':'2023-12-08','totalPayment':16096.19,'interestPayment':1344.87,'debtPayment':14751.32,'remainingDebt':215796.35},{'number':11,'date':'2024-01-08','totalPayment':16096.19,'interestPayment':1258.82,'debtPayment':14837.37,'remainingDebt':200958.98},{'number':12,'date':'2024-02-08','totalPayment':16096.19,'interestPayment':1172.27,'debtPayment':14923.92,'remainingDebt':186035.06},{'number':13,'date':'2024-03-08','totalPayment':16096.19,'interestPayment':1085.21,'debtPayment':15010.98,'remainingDebt':171024.08},{'number':14,'date':'2024-04-08','totalPayment':16096.19,'interestPayment':997.65,'debtPayment':15098.54,'remainingDebt':155925.54},{'number':15,'date':'2024-05-08','totalPayment':16096.19,'interestPayment':909.57,'debtPayment':15186.62,'remainingDebt':140738.92},{'number':16,'date':'2024-06-08','totalPayment':16096.19,'interestPayment':820.98,'debtPayment':15275.21,'remainingDebt':125463.71},{'number':17,'date':'2024-07-08','totalPayment':16096.19,'interestPayment':731.88,'debtPayment':15364.31,'remainingDebt':110099.4},{'number':18,'date':'2024-08-08','totalPayment':16096.19,'interestPayment':642.25,'debtPayment':15453.94,'remainingDebt':94645.46},{'number':19,'date':'2024-09-08','totalPayment':16096.19,'interestPayment':552.1,'debtPayment':15544.09,'remainingDebt':79101.37},{'number':20,'date':'2024-10-08','totalPayment':16096.19,'interestPayment':461.43,'debtPayment':15634.76,'remainingDebt': 63466.61},{'number':21,'date':'2024-11-08','totalPayment':16096.19,'interestPayment':370.23,'debtPayment':15725.96,'remainingDebt':47740.65},{'number':22,'date':'2024-12-08','totalPayment':16096.19,'interestPayment':278.49,'debtPayment':15817.7,'remainingDebt':31922.95},{'number':23,'date':'2025-01-08','totalPayment':16096.19,'interestPayment':186.22,'debtPayment':15909.97,'remainingDebt':16012.98},{'number':24,'date':'2025-02-08','totalPayment':16096.19,'interestPayment':93.41,'debtPayment':16002.78,'remainingDebt':10.2}];

export type payment = {
    number: number,
    date: string,
    totalPayment: number,
    interestPayment: number,
    debtPayment: number,
    remainingDebt: number
}

function Schedule() {
    const {applicationId: stateApplicationId, stage} = useAppSelector(state => state.application);
    const {applicationId} = useParams();
    const numberApplicationId = Number(applicationId);
    console.log(stage);
    if(numberApplicationId !== stateApplicationId || stage < 3) return <Navigate to={'/loan'}/>;

    const [paymentSchedule, setPaymentSchedule] = React.useState<payment[]>([]);
    const [isChecked, setIsChecked] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        axios.get(`http://localhost:8080/admin/application/${applicationId}`)
            .then(res => res.data)
            .then(res => {
                setPaymentSchedule(res.credit?.paymentSchedule);
                console.log(res);
            });
    }, []);

    console.log(paymentSchedule);

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
                {isModalOpen && <DenyModal onClose={closeModalHandler} applicationId={Number(applicationId)}/>}
            </>
        </Layout>
    );
}
export default Schedule;