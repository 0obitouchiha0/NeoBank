import React from 'react';
import axios from 'axios';

import CoursesListItem from './CoursesListItem/CoursesListItem';
import styles from './styles.module.scss';

function FeaturesList() {
    const currencies = ['USD', 'EUR', 'CNY', 'CHF', 'JPY', 'TRY'];

    const [currenciesData, setCurrenciesData] = React.useState<{currency: string, course: number}[]>([]);

    React.useEffect(() => {
        let currenciesCount = 0;
        async function getAndSetCurrencies() {
            for(const currency of currencies) {
                const course = await axios.get<number>(`https://currency-exchange.p.rapidapi.com/exchange?to=RUB&from=${currency}`, {
                    headers: {
                        'X-RapidAPI-Key': 'cbea4abd97msh640a68bb4870e2ep143135jsna1b8e410fbe0',
                        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
                    }
                })
                    .then(res => Math.round(res.data * 100) / 100);
                if(currenciesCount >= currencies.length) {
                    setCurrenciesData([]);
                    currenciesCount = 0;
                }
                currenciesCount++;
                setCurrenciesData(prev => [...prev, {currency, course}]);
            }
        }

        getAndSetCurrencies();
        setInterval(async () => {
            getAndSetCurrencies();
        }, 900000);
    }, []);

    return (
        <ul className={styles['courses-list']}>
            {currenciesData.map(({currency, course}) => (
                <CoursesListItem key={currency} currency={currency} course={course}/>
            ))}
        </ul>
    );
}

export default FeaturesList;
