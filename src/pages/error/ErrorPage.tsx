import React from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './styles.module.scss';
import errorImg from '../../assets/pagesImages/errorPage/error.png';
import { Link } from 'react-router-dom';

function ErrorPage() {

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1 className={styles.info__title}>Oops....</h1>
                    <h3 className={styles.info__subtitle}>Page not found</h3>
                    <p className={styles.info__text}>This Page doesn`t exist or was removed! We suggest you go back.</p>
                    <Link to="/" className={styles.info__link}>Go back</Link>
                </div>
                <div className={styles.container__img}>
                    <img src={errorImg} alt="error" />
                </div>
            </div>
        </Layout>
    );
}
export default ErrorPage;