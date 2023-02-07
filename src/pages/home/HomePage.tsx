import React from 'react';

import styles from './styles.module.scss';
import Layout from '../../components/Layout/Layout';
import Cards from './components/Cards/Cards';
import FeaturesList from './components/FeaturesList/FeaturesList';
import happyDeveloperImg from '../../assets/pagesImages/homePage/happyDeveloper.png';
import CoursesList from './components/CoursesList/CoursesList';
import NewsSlider from './components/NewsSlider/NewsSlider';
import bankImg from '../../assets/pagesImages/homePage/bank.png';
import mapImg from '../../assets/pagesImages/homePage/map.png';
import SubscriptionField from './components/SubscriptionField/SubscriptionField';

function HomePage() {
    return (
        <Layout>
            <main className={styles.main}>
                <section className={styles.design}>
                    <div className={styles.info}>
                        <h1 className={styles.info__title}>Choose the design you like and apply for card right now</h1>
                        <a href="#" className={styles['blue-link']}>Choose the card</a>
                    </div>
                    <Cards/>
                </section>
                <section className={styles.features}>
                    <div className={styles['features__img-container']}>
                        <img src={happyDeveloperImg} alt="happy developer"/>
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.content__title}>We Provide Many Features You Can Use</h1>
                        <h6 className={styles.content__subtitle}>You can explore the features that we provide with fun and have their own functions each feature</h6>
                        <FeaturesList />
                    </div>
                </section>
                <section className={styles.exchange}>
                    <div className={styles['exchange-main']}>
                        <h1 className={styles['exchange-main__title']}>Exhange rate in internet bank</h1>
                        <h4 className={styles['exchange-main__subtitle']}>Currency</h4>
                        <CoursesList />
                        <a href="#" className={styles['exchange-main__all-courses-link']}>All courses</a>
                    </div>
                    <div className={styles['exchange-aside']}>
                        <h4 className={styles['exchange-aside__last-update']}></h4>
                        <div className={styles['exchange-aside__bank-img']}>
                            <img src={bankImg} alt="bank"/>
                        </div>
                    </div>
                </section>
                <section className={styles.map}>
                    <h2 className={styles.map__title}>You can use our services anywhere in the world</h2>
                    <h4 className={styles.map__subtitle}>Withdraw and transfer money online through our application</h4>
                    <img src={mapImg} alt="map" className={styles.map__img}/>
                </section>
                <section className={styles.news}>
                    <h1 className={styles.news__title}>Current news from the world of finance</h1>
                    <h3 className={styles.news__subtitle}>We update the news feed every 15 minutes. You can learn more by clicking on the news you are interested in.</h3>
                    <NewsSlider/>
                </section>
                <section className={styles.subscription}>
                    <h4 className={styles.subscription__title}>Support</h4>
                    <h3 className={styles['subscription__subtitle-firstline']}>Subscribe Newsletter & get</h3>
                    <h3 className={styles['subscription__subtitle-secondline']}>Bank News</h3>
                    <SubscriptionField />
                </section>
            </main>
        </Layout>
    );
}

export default HomePage;
