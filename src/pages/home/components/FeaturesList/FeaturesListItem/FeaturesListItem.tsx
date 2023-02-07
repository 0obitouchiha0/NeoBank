import React from 'react';

import styles from './styles.module.scss';

interface FeaturesListItemProps {
    src: string,
    text: string
}

function FeaturesListItem({src, text}: FeaturesListItemProps) {
    return (
        <li className={styles['features-list__item']}>
            <img src={src} alt="check mark"/>
            <span>{text}</span>
        </li>
    );
}

export default FeaturesListItem;
