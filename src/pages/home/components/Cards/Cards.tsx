import React from 'react';

import styles from './styles.module.scss';
import card1Img1 from '../../../../assets/pagesImages/homePage/cardImage1.png';
import card1Img2 from '../../../../assets/pagesImages/homePage/cardImage2.png';
import card1Img3 from '../../../../assets/pagesImages/homePage/cardImage3.png';
import card1Img4 from '../../../../assets/pagesImages/homePage/cardImage4.png';
import CardsItem from './CardsItem/CardsItem';

const imgSources = [card1Img1, card1Img2, card1Img3, card1Img4];

function Cards() {
    return (
        <div className={styles.cards}>
            {imgSources.map((src, index) => (
                <CardsItem key={src} src={src} index={index}/>
            ))}
        </div>
    );
}

export default Cards;
