import React from 'react';
import InfoCard from '../../../InfoCard/InfoCard';
import styles from './styles.module.scss';
import cardsData from './data';

function TabPageAbout() {
    return (
        <div className={styles.cards}>
            {cardsData.map(({title, description, color, area, img}) => (
                <InfoCard key={title} title={title} description={description} color={color} area={area} img={img}/>
            ))}
        </div>
    );
}

export default TabPageAbout;