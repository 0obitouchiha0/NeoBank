import React from 'react';
import styles from './styles.module.scss';
import { offerType } from '../../../../../store/slices/applicationSlice';
import offerImg from '../../../../../assets/common/offer.png';
import correctMark from '../../../../../assets/pagesImages/loanPage/correctMark.svg';
import error from '../../../../../assets/pagesImages/loanPage/error.svg';

interface OfferItemProps {
    offer: offerType,
    onSelect: (offer: offerType) => void
}

function OfferItem({offer, onSelect}: OfferItemProps) {
    console.log(offer);
    return (
        <div className={styles.offer}>
            <img src={offerImg} alt="present" />
            <ul className={styles.offer__stats}>
                <li className={styles['offer__stats-item']}>
                    <span>Requested amount: {offer.requestedAmount} ₽</span>
                </li>
                <li className={styles['offer__stats-item']}>
                    <span>Total amount: {offer.totalAmount} ₽</span>
                </li>
                <li className={styles['offer__stats-item']}>
                    <span>For {offer.term} months</span>
                </li>
                <li className={styles['offer__stats-item']}>
                    <span>Monthly payment: {offer.monthlyPayment} ₽</span>
                </li>
                <li className={styles['offer__stats-item']}>
                    <span>Your rate: {offer.rate}%</span>
                </li>
                <li className={styles['offer__stats-item']}>
                    <span>Insurance included: </span>
                    <img src={offer.isInsuranceEnabled ? correctMark : error} alt="" />
                </li>
                <li className={styles['offer__stats-item']}>
                    <span>Salary client: </span>
                    <img src={offer.isSalaryClient ? correctMark : error} alt="" />
                </li>
            </ul>
            <button className={styles.offer__btn} onClick={() => onSelect(offer)}>Select</button>
        </div>
    );
}
export default OfferItem;