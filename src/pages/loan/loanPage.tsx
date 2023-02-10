import React from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './styles.module.scss';
import cardImg from '../../assets/pagesImages/loanPage/card.png';
import Tabs from './components/Tabs/Tabs';
import GettingCardStep from './components/GettingCardStep/GettingCardStep';
import CardForm from './components/CardForm/CardForm';
import FeaturesItem from './components/FeaturesItem/FeaturesItem';
import { useAppSelector } from '../../store/store';
import Offers from './components/Offers/Offers';
import Notification from '../../components/Notification/Notification';
import { useNavigate } from 'react-router';
import { featuresData, gettingCardStepsData } from './data';

function LoanPage() {

    const mainBlockRef = React.useRef<HTMLDivElement>(null);
    const {offers, stage, applicationId} = useAppSelector(state => state.application);
    const navigate = useNavigate();

    function getComponentDependingOnStage() {
        if(stage === 0) return <CardForm />;
        else if(stage === 1) return <Offers offers={offers}/>;
        else return <div className={styles.notification__container}>
            <Notification title={'The preliminary decision has been sent to your email.'} description={'In the letter you can get acquainted with the preliminary decision on the credit card.'} />
        </div>;
    }

    function handleBannerBtnClick() {
        if(stage < 2) {
            mainBlockRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        else if(stage === 2) navigate(`/loan/${applicationId}`);
        else if(stage === 3) navigate(`/loan/${applicationId}/document`);
        else if(stage === 4) navigate(`/loan/${applicationId}/document/sign`);
        else if(stage === 5) navigate(`/loan/${applicationId}/code`);
    }

    return (
        <Layout>
            <>
                <section className={styles.advertisement}>
                    <div className={styles.banner}>
                        <h1 className={styles['banner__title']}>Platinum digital credit card</h1>
                        <p className={styles['banner__description']}>Our best credit card. Suitable for everyday spending and shopping.<br/>Cash withdrawals and transfers without commission and interest.</p>
                        <ul className={styles.features}>
                            {featuresData.map(feature => (
                                <FeaturesItem key={feature.title} {...feature}/>
                            ))}
                        </ul>
                        <div className={styles['banner__btn']}>
                            <button onClick={handleBannerBtnClick}>{stage < 2 ? 'Apply for card' : 'Continue registration'}</button>
                        </div>
                        <div className={styles.banner__img}>
                            <img src={cardImg} alt="card" />
                        </div>
                    </div>
                </section>
                <Tabs />
                <section className={styles.steps}>
                    <h1 className={styles.steps__title}>How to get a card</h1>
                    <div className={styles.steps__items}>
                        {gettingCardStepsData.map(item => (
                            <GettingCardStep key={item.text} index={item.index} text={item.text}/>
                        ))}
                    </div>
                </section>
                <div ref={mainBlockRef}>
                    {getComponentDependingOnStage()}
                </div>
            </>
        </Layout>
    );
}

export default LoanPage;
