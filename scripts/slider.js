(async function() {
    const sliderLine = document.querySelector('.news-slider__line');
    const slider = document.querySelector('.news-slider');
    const btnLeft = document.querySelector('.news-btns__item--left');
    const btnRight = document.querySelector('.news-btns__item--right');

    const {articles} = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b483f40812184a8e8e2eb453e42ba60a').then(res => res.json())
    let cardsCount = 0;

    const insertArticleWithImgCheck = (article) => {
        return new Promise((res) => {
            fetch(article.urlToImage, {mode: "no-cors"})
                .then(() => {
                    console.log(article.urlToImage)
                    const isDescriptionValid = !(/<\/?[a-z][\s\S]*>/i.test(article.description))
                    const isTitleValid = !(/<\/?[a-z][\s\S]*>/i.test(article.title))
                    if(isDescriptionValid && isTitleValid) {
                        cardsCount++
                        sliderLine.innerHTML += `
                            <a class="news-card" href="${article.url}")>
                                <div class="news-card__img">
                                    <img src="${article.urlToImage}" alt="news-img"/>
                                </div>
                                <h1 class="news-card__title">${article.title}</h1>
                                <p class="news-card__description">${article.description}</p>
                            </ф>
                        `;
                    }
                    res()
                })
                .catch(() => {
                    res()
                })
            })
    }

    const promises = articles.map(async article => {
        const result = await insertArticleWithImgCheck(article)
        return new Promise((res) => {res(result)})
    })
    
    Promise.all(promises)
    .then(() => {
        console.log('return', cardsCount)
        if(!sliderLine.children.length) console.log('return')

        const cardWidth = sliderLine.children[0].offsetWidth;
        const gapWidth = sliderLine.children[1].offsetLeft - sliderLine.children[0].offsetLeft - sliderLine.children[0].offsetWidth;
        const itemFullWidth = cardWidth + gapWidth;
        const fullWidth = cardsCount * cardWidth + gapWidth * (cardsCount - 1)
        const visibleWidth = sliderLine.offsetWidth;
        let offset = 0;

        console.log({cardsCount, fullWidth, visibleWidth, sliderLength: sliderLine.childElementCount})
        
        function checkOffsetAndDisableBtn() {
            if(offset === 0) {
                btnLeft.disabled = true;
            } else {
                btnLeft.disabled = false;
            }
        
            if(offset === visibleWidth - fullWidth) {
                btnRight.disabled = true;
            } else {
                btnRight.disabled = false;
            }
        }
        
        function swipeRight() {
            if(offset > -itemFullWidth)
                offset = 0;
            else
                offset += itemFullWidth;
            sliderLine.style.left = offset + 'px';
            checkOffsetAndDisableBtn()
        }
        function swipeLeft() {
            if(fullWidth - visibleWidth + offset < itemFullWidth)
                offset = visibleWidth - fullWidth;
            else
                offset -= itemFullWidth;
            sliderLine.style.left = offset + 'px';
            checkOffsetAndDisableBtn()
        }
        
        checkOffsetAndDisableBtn()
        btnLeft.addEventListener('click', swipeRight)
        btnRight.addEventListener('click', swipeLeft)
        
        let swipeLength = 0
        let swipeStartPos = 0
    
        slider.addEventListener('touchstart', e => {
            swipeStartPos = e.touches[0].clientX
        })
        slider.addEventListener('touchmove', e => {
            swipeLength = e.touches[0].clientX - swipeStartPos
        })
        slider.addEventListener('touchend', (e) => {
            if(swipeLength > 50)
                swipeRight()
            else if(swipeLength < -50)
                swipeLeft()
            swipeLength = 0
        })
    })
        // articles.forEach((article, i, arr) => {
        //     const isImgValid = article.urlToImage && article.urlToImage.match(/\.(jpeg|jpg|png)$/) != null
        //     const isDescriptionValid = !(/<\/?[a-z][\s\S]*>/i.test(article.description))
        //     const isTitleValid = !(/<\/?[a-z][\s\S]*>/i.test(article.title))
        //     if(isImgValid && isDescriptionValid && isTitleValid) {
                 
        //     }
        //     console.log(article.urlToImage)
        //     fetch(article.urlToImage, {mode: "no-cors"})
        //         .then(() => {
        //             console.log('img')
        //             sliderLine.innerHTML += `
        //                 <a class="news-card" href="${article.url}")>
        //                     <div class="news-card__img">
        //                         <img src="${article.urlToImage}" alt="news-img"/>    
        //                     </div>
        //                     <h1 class="news-card__title">${article.title}</h1>
        //                     <p class="news-card__description">${article.description}</p>
        //                 </a>
        //             `;
        //         })  
        //     if(i === arr.length - 1) res()
        // })

        
}())