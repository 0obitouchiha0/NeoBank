import React from 'react';

import styles from './styles.module.scss';
import checkMark from '../../../../assets/pagesImages/homePage/featuresCheckMark.svg';
import FeaturesListItem from './FeaturesListItem/FeaturesListItem';

function FeaturesList() {
    const featuresItemsTexts = ['Powerfull online protection.', 'Cashback without borders.', 'Personal design.', 'Work anywhere in the world.'];
    return (
        <ul className={styles['features-list']}>
            {featuresItemsTexts.map(text => (
                <FeaturesListItem key={text} src={checkMark} text={text}/>
            ))}
        </ul>
    );
}

export default FeaturesList;
