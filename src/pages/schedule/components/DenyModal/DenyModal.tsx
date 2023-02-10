import React from 'react';
import styles from './styles.module.scss';
import closeImg from '../../../../assets/pagesImages/schedulePage/close.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/store';
import { denyApplication } from '../../../../store/slices/applicationSlice';

interface DenyModalProps {
    onClose: () => void,
    applicationId: number
}

export default function DenyModal({onClose, applicationId}: DenyModalProps) {

    const [isDenied, setIsDenied] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function denyHandler() {
        setIsDenied(true);
        dispatch(denyApplication(applicationId));
    }

    return (
        <div className={styles.background}>
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <h3>Deny application</h3>
                    <img src={closeImg} alt="exit" onClick={!isDenied ? onClose : () => navigate('/')}/>
                </div>
                <div className={styles.content}>
                    {!isDenied ? <div className={styles.content}>
                        <p className={styles.content__text}>You exactly sure, you want to cancel this application?</p>
                        <div className={styles.content__btns}>
                            <button className={styles.denyBtn} onClick={denyHandler}>Deny</button>
                            <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                        : <div className={styles.content}>
                            <p className={styles.content__text}>Your application has been deny!</p>
                            <Link to="/" className={styles.homeLink}>Go home</Link>
                        </div>}
                </div>
            </div>
        </div>
    );
}

