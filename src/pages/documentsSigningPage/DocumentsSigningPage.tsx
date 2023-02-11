import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';

import Layout from '../../components/Layout/Layout';
import styles from './styles.module.scss';
import Notification from '../../components/Notification/Notification';
import docIcon from '../../assets/pagesImages/documentsSigningPage/doc_icon.svg';
import Checkbox from '../../components/Checkbox/Checkbox';
import { signApplication } from '../../store/slices/applicationSlice';
import AllowStageHOC from '../../components/AllowStageHOC/AllowStageHOC';

function DocumentsSigning() {
    const {applicationId, stage} = useAppSelector(state => state.application);
    const [isChecked, setIsChecked] = React.useState(false);
    const dispatch = useAppDispatch();

    function sendHandler() {
        dispatch(signApplication(Number(applicationId)));
    }

    return (
        <Layout>
            {stage === 4
                ? <div className={styles.container}>
                    <div className={styles.title}>
                        <h1 className={styles.title__name}>Signing of documents</h1>
                        <span className={styles.title__step}>Step 4 of 5</span>
                    </div>
                    <p className={styles.container__info}>
                        Information on interest rates under bank deposit agreements with individuals. Center for Corporate Information Disclosure. Information of
                        a professional participant in the securities market. Information about persons under whose control or significant influence the Partner
                        Banks are. By leaving an application, you agree to the processing of personal data, obtaining information, obtaining access to a credit
                        history, using an analogue of a handwritten signature, an offer, a policy regarding the processing of personal data, a form of consent to the
                        processing of personal data.
                    </p>
                    <a className={styles.container__file} href="https://neostudy.neoflex.ru/pluginfile.php/102895/mod_assign/intro/credit-card-offer.pdf" target="_blank" rel="noopener noreferrer" data-testid="informationFileLink">
                        <img src={docIcon} alt="document" />
                        <span>Information on your card</span>
                    </a>
                    <div className={styles.container__send}>
                        <Checkbox labelText={'I agree'} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        <button disabled={!isChecked} onClick={sendHandler}>Send</button>
                    </div>
                </div>
                : <div className={styles.notification__container}>
                    <Notification title={'Documents have been successfully signed and sent for approval'} description={'Within 10 minutes you will be sent a PIN code to your email for confirmation'} />
                </div>}
        </Layout>
    );
}

const DocumentsSigningPage = () => <AllowStageHOC stage={4}><DocumentsSigning/></AllowStageHOC>;
export default DocumentsSigningPage;

export {DocumentsSigning};