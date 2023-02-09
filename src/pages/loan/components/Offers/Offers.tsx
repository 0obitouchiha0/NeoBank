import React from 'react';
import OfferItem from './OfferItem/OfferItem';
import styles from './styles.module.scss';
import { chooseOffer, offerType } from '../../../../store/slices/applicationSlice';
import { useAppDispatch } from '../../../../store/store';

interface OffersProps {
    offers: offerType[]
}

function Offers({offers}: OffersProps) {
    console.log(offers);

    const dispatch = useAppDispatch();

    function applyOfferHandler(offer: offerType) {
        dispatch(chooseOffer(offer));
    }

    return (
        <div className={styles.offers}>
            {offers.map(offer => (
                <OfferItem key={offer.monthlyPayment} offer={offer} onSelect={applyOfferHandler}/>
            ))}
        </div>
    );
}

export default Offers;