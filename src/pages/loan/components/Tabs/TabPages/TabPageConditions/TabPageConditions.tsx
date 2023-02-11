import React from 'react';
import styles from './styles.module.scss';
import conditionsData from './data';

// const conditionsData = {
//     'Card currency': 'Rubles, dollars, euro',
//     'Interest free period': '0% up to 160 days',
//     'Payment system': 'Mastercard, Visa',
//     'Maximum credit limit on the card': '600 000 ₽',
//     'Replenishment and withdrawal': 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
//     'Max cashback per month': '15 000 ₽',
//     'Transaction Alert': ['60 ₽ — SMS or push notifications', '0 ₽ — card statement, information about transactions in the online bank']
// };

// 'Transaction Alert': '60 ₽ — SMS or push notifications \n 0 ₽ — card statement, information about transactions in the online bank'

function TabPageConditions() {
    return (
        <ul className={styles['conditions-list']}>
            {/* {Object.keys(conditionsData).map(title => {
                const typedTitle = title as keyof typeof conditionsData;
                if(Array.isArray(conditionsData[typedTitle])) {
                    const conditionsArr = conditionsData[typedTitle] as string[];
                    return (
                        <li key={conditionsData[typedTitle][0]} className={styles['conditions-list__item']}>
                            {conditionsArr.map(cond => (
                                <>
                                    <p key={cond}>{cond}</p>
                                </>
                            ))}
                        </li>
                    );
                }
                else {
                    return (
                        <li key={conditionsData[typedTitle][0]} className={styles['conditions-list__item']}>
                            {conditionsData[typedTitle]}
                        </li>
                    );
                }
            })} */}
            {conditionsData.map(({title, description}) => (
                <li key={title} className={styles['conditions-list-item']}>
                    <span className={styles['conditions-list-item__title']}>{title}</span>
                    {Array.isArray(description) 
                        ? <div>
                            {description.map(descriptionItem => (
                                <p key={descriptionItem}>{descriptionItem}</p>
                            ))}
                        </div>
                        : <p>{description}</p>
                    }
                </li>
            ))}
            {/* {Object.keys(conditionsData).map(title => {
                const typedTitle = title as keyof typeof conditionsData;
                return (
                    <li key={typedTitle} className={styles['conditions-list__item']}>
                        <span>{typedTitle}</span> <span>{conditionsData[typedTitle].split('\n').join('')}</span>
                    </li>
                );
            })} */}
        </ul>
    );
}

export default TabPageConditions;