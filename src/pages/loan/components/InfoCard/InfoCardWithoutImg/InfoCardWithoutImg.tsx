import React from 'react';
import styles from './styles.module.scss';

interface InfoCardWithoutImgProps {
    title: string,
    description: string
}

function InfoCardWithoutImg({title, description}: InfoCardWithoutImgProps) {
    return (
        <div className={styles['card-content']}>
            <p className={styles['card-content__description']}>{description}</p>
            <h1 className={styles['card-content__title']}>{title}</h1>
        </div>
    );
}

export default InfoCardWithoutImg;