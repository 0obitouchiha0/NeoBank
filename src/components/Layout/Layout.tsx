import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import logo from '../../assets/LayoutImages/logo.png';

interface LayoutProps {
    children: React.ReactElement
}

function Layout({children}: LayoutProps) {
    return (
        <>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <input type="checkbox" id={styles.burger}/>
                    <label htmlFor={styles.burger} className={styles.label}>☰</label>
                    <nav className={styles.nav}>
                        <a href="#" className={styles['nav__home-link']}>NeoBank</a>
                        <div className={styles.nav__links}>
                            <a href="#" className={styles['nav__links-link']}>Credit Card</a>
                            <a href="#" className={styles['nav__links-link']}>Product</a>
                            <a href="#" className={styles['nav__links-link']}>Account</a>
                            <a href="#" className={styles['nav__links-link']}>Resourses</a>
                        </div>
                        <a href="#" className={clsx(styles['nav__bank-link'], styles['blue-link'])}>Online Bank</a>
                    </nav>
                </header>
                {children}
            </div>
            <footer className={styles.footer}>
                <div className={styles.footer__container}>
                    <div className={styles.footer__main}>
                        <img src={logo} alt="NeofleX"/>
                        <div className={styles.contacts}>
                            <span className={styles.contacts__phone}>+7 (495) 984 25 13</span>
                            <span className={styles.contacts__email}>info@neoflex.ru</span>
                        </div>
                    </div>
                    <ul className={styles.links}>
                        <li className={styles.links__item}>
                            <a href="">About bank</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Ask a Question</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Quality of service</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Requisites</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Press center</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Bank career</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Investors</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Investors</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Business and processes</a>
                        </li>
                        <li className={styles.links__item}>
                            <a href="">Compliance and business ethics</a>
                        </li>
                    </ul>
                    <div className={styles.footer__line}></div>
                    <p className={styles['footer__cookies-info']}>We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings</p>
                </div>
            </footer>
        </>
    );
}

export default Layout;
