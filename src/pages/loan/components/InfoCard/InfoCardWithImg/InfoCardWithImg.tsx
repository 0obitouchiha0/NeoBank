import React from 'react';
import styles from './styles.module.scss';

interface InfoCardWithImgProps {
    title: string,
    description: string,
    img: string
}

function InfoCardWithImg({title, description, img}: InfoCardWithImgProps) {
    return (
        <div className={styles['card-content']}>
            <img src={require(`../../../../../assets/pagesImages/loanPage/${img}`)} alt="logo" />
            <h1 className={styles['card-content__title']}>{title}</h1>
            <p className={styles['card-content__description']}>{description}</p>
        </div>
    );
}

export default InfoCardWithImg;