const currencies = ['USD', 'EUR', 'CNY', 'CHF', 'JPY', 'TRY'];
let ratesListInner = '';
const ratesList = document.querySelector('.rates-list');

async function getAndSetCurrencies() {
    for(let currency of currencies) {
        const course = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=RUB&from=${currency}`, {
            headers: {
                'X-RapidAPI-Key': 'cbea4abd97msh640a68bb4870e2ep143135jsna1b8e410fbe0',
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        })
        .then(res => res.json())
        .then(res => Math.round(res * 100) / 100);
        
        ratesListInner += `
        <li class="rates-list__item">
            <span class="rate-name">${currency}:</span>
            <span class="rate-value">${course}</span>
        </li>`;
    }
    ratesList.innerHTML = ratesListInner;
}

getAndSetCurrencies()
setInterval(async () => {
    getAndSetCurrencies()
}, 900000)

// (async function() {
//     for(let currency of currencies) {
//         const course = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=RUB&from=${currency}`, {
//             headers: {
//                 'X-RapidAPI-Key': 'cbea4abd97msh640a68bb4870e2ep143135jsna1b8e410fbe0',
//                 'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
//             }
//         })
//         .then(res => res.json())
//         .then(res => Math.round(res * 100) / 100);
        
//         ratesListInner += `
//         <li class="rates-list__item">
//             <span class="rate-name">${currency}:</span>
//             <span class="rate-value">${course}</span>
//         </li>`;
//     }
//     ratesList.innerHTML = ratesListInner;
// }())