import React from 'react';

import styles from './styles.module.scss';

interface CardsItemProps {
    src: string,
    index: number
}

function CardsItem({src, index}: CardsItemProps) {
    return (
        <div className={styles.cards__item}>
            <img src={src} alt={`card${index}`}/>
        </div>
    );
}

export default CardsItem;
