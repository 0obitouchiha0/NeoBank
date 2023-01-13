(async function() {
    const sliderLine = document.querySelector('.news-slider__line');
    const slider = document.querySelector('.news-slider');
    const btnLeft = document.querySelector('.news-btns__item--left');
    const btnRight = document.querySelector('.news-btns__item--right');

    const {articles = []} = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b483f40812184a8e8e2eb453e42ba60a').then(res => res.json())

    const insertArticleWithImgCheck = (article) => {
        if(!article.urlToImage || !article.title || !article.description || !article.url) return
        return new Promise((res) => {
            fetch(article.urlToImage, {mode: "no-cors"})
                .then(() => {
                    const isDescriptionValid = !(/<\/?[a-z][\s\S]*>/i.test(article.description))
                    const isTitleValid = !(/<\/?[a-z][\s\S]*>/i.test(article.title))
                    const isUrlValid = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(article.url)
                    if(isDescriptionValid && isTitleValid && isUrlValid) {
                        sliderLine.innerHTML += `
                            <a class="news-card" href="${article.url}") target="_blank">
                                <div class="news-card__img">
                                    <img src="${article.urlToImage}" alt="news-img"/>
                                </div>
                                <h1 class="news-card__title">${article.title}</h1>
                                <p class="news-card__description">${article.description}</p>
                            </a>
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
        if(!sliderLine.children.length) return

        const cardsCount = sliderLine.childElementCount;
        const cardWidth = sliderLine.children[0].offsetWidth;
        const gapWidth = sliderLine.children[1].offsetLeft - sliderLine.children[0].offsetLeft - sliderLine.children[0].offsetWidth;
        const itemFullWidth = cardWidth + gapWidth;
        const fullWidth = cardsCount * cardWidth + gapWidth * (cardsCount - 1)
        const visibleWidth = sliderLine.offsetWidth;
        const visibleItemsCount = Math.trunc(visibleWidth / (cardWidth + gapWidth))
        let offset = 0;
        
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
                if(offset === visibleWidth - fullWidth)
                    offset += cardWidth - (visibleWidth - visibleItemsCount * (cardWidth + gapWidth));
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
}())