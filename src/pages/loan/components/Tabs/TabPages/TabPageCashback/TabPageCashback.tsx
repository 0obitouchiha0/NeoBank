import React from 'react';
import InfoCard from '../../../InfoCard/InfoCard';
import styles from './styles.module.scss';
import cardsData from './data';

function TabPageCashback() {
    return (
        <div className={styles.cards}>
            {cardsData.map(({title, description, color, area}) => (
                <InfoCard key={title} title={title} description={description} color={color} area={area}/>
            ))}
        </div>
    );
}

export default TabPageCashback;