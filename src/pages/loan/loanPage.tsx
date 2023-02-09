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

const gettingCardStepsData = [
    {
        index: 1,
        text: 'Fill out an online application - you do not need to visit the bank'
    },
    {
        index: 2,
        text: 'Find out the bank\'s decision immediately after filling out the application'
    },
    {
        index: 3,
        text: 'The bank will deliver the card free of charge, wherever convenient, to your city'
    },
];

const featuresData = [
    {
        title: 'Up to 160 days',
        description: 'No percent',
        prompt: 'When repaying the full debt up to 160 days.'
    },
    {
        title: 'Up to 600 000 ₽',
        description: 'Credit limit',
        prompt: 'Over the limit willaccrue percent'
    },
    {
        title: '0 ₽',
        description: 'Card service is free',
        prompt: 'Promotion valid until December 31, 2022.'
    },
];

function LoanPage() {

    const formRef = React.useRef<HTMLFormElement>(null);
    const {offers, stage} = useAppSelector(state => state.application);

    function getComponentDependingOnStage() {
        if(stage === 0) return <CardForm />;
        else if(stage === 1) return <Offers offers={offers}/>;
        else return <div className={styles.notification__container}>
            <Notification title={'The preliminary decision has been sent to your email.'} description={'In the letter you can get acquainted with the preliminary decision on the credit card.'} />
        </div>;
    }

    function scrollToForm() {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                            <button onClick={scrollToForm}>Apply for card</button>
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
                {getComponentDependingOnStage()}
            </>
        </Layout>
    );
}

export default LoanPage;
