import React from 'react';
import styles from './styles.module.scss';

interface GettingCardStepProps {
    index: number,
    text: string
}

function GettingCardStep({index, text}: GettingCardStepProps) {
    return (
        <div className={styles.step}>
            <div className={styles['step-firstline']}>
                <div className={styles['step-firstline__index']}>{index}</div>
                <hr className={styles['step-firstline__line']}/>
            </div>
            <p className={styles.step__text}>{text}</p>
        </div>
    );
}

export default GettingCardStep;
