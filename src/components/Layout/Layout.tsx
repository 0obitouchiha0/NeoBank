import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';
import logo from '../../assets/LayoutImages/logo.png';
import { Link } from 'react-router-dom';

const headerLinks = [
    {
        to: '/loan',
        text: 'Credit Card'
    },
    {
        to: '/',
        text: 'Product'
    },
    {
        to: '/',
        text: 'Account'
    },
    {
        to: '/',
        text: 'Resourses'
    },
];

interface LayoutProps {
    children: React.ReactElement
}

function Layout({children}: LayoutProps) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <input type="checkbox" id={styles.burger}/>
                    <label htmlFor={styles.burger} className={styles.label}>☰</label>
                    <nav className={styles.nav}>
                        <Link to="/" className={styles['nav__home-link']}>NeoBank</Link>
                        <div className={styles.nav__links}>
                            {headerLinks.map(link => (
                                <Link key={link.text} to={link.to} className={styles['nav__links-link']}>{link.text}</Link>
                            ))}
                        </div>
                        <a href="#" className={clsx(styles['nav__bank-link'], styles['blue-link'])}>Online Bank</a>
                    </nav>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
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
                            <Link to="#">About bank</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Ask a Question</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Quality of service</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Requisites</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Press center</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Bank career</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Investors</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Investors</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Business and processes</Link>
                        </li>
                        <li className={styles.links__item}>
                            <Link to="#">Compliance and business ethics</Link>
                        </li>
                    </ul>
                    <div className={styles.footer__line}></div>
                    <p className={styles['footer__cookies-info']}>We use cookies to personalize our services and improve the user experience of our website. Cookies are small files containing information about previous visits to a website. If you do not want to use cookies, please change your browser settings</p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
