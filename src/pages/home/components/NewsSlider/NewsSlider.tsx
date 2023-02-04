import React from 'react';
import clsx from 'clsx';

import NewsSliderItem from './NewsSliderItem/NewsSliderItem';
import styles from './styles.module.scss';
import axios from 'axios';
import { articleType } from './types';

function NewsSlider() {
    const sliderLineRef = React.useRef<HTMLDivElement>(null);

    const [btnLeftDisabled, setBtnLeftDisabled] = React.useState(false);
    const [btnRightDisabled, setBtnRightDisabled] = React.useState(false);
    const [articlesData, setArticlesData] = React.useState<articleType[]>([]);
    const [offset, setOffset] = React.useState(0);

    const cardsCount = articlesData.length;
    const cardWidth = 320;
    const gapWidth = 80;
    const itemFullWidth = cardWidth + gapWidth;
    const fullWidth = cardsCount * cardWidth + gapWidth * (cardsCount - 1);
    const visibleWidth = sliderLineRef.current?.offsetWidth || 0;
    const visibleItemsCount = Math.trunc(visibleWidth / (cardWidth + gapWidth));

    function checkOffsetAndDisableBtn(offset: number) {
        if(offset === 0) {
            setBtnLeftDisabled(true);
        } else {
            setBtnLeftDisabled(false);
        }

        if(offset === visibleWidth - fullWidth) {
            setBtnRightDisabled(true);
        } else {
            setBtnRightDisabled(false);
        }
    }

    function swipeRight() {
        let currentOffset = 0; 
        if(offset > -itemFullWidth) {
            setOffset(0);
            currentOffset = 0;
        }
        else {
            if(offset === visibleWidth - fullWidth) {
                const newOffset = offset + (cardWidth - (visibleWidth - visibleItemsCount * (cardWidth + gapWidth)));
                currentOffset = newOffset;
                setOffset(newOffset);
            }
            else {
                const newOffset = offset + itemFullWidth;
                currentOffset = newOffset;
                setOffset(newOffset);
            }
        }
        checkOffsetAndDisableBtn(currentOffset);
    }
    function swipeLeft() {
        let currentOffset = 0; 
        if(fullWidth - visibleWidth + offset < itemFullWidth) {
            const newOffset = visibleWidth - fullWidth;
            currentOffset = newOffset;
            setOffset(newOffset);
        }
        else {
            const newOffset = offset - itemFullWidth;
            currentOffset = newOffset;
            setOffset(newOffset);
        }
        checkOffsetAndDisableBtn(currentOffset);
    }

    let swipeLength = 0;
    let swipeStartPos = 0;
    function touchStartHandler(e: React.TouchEvent<HTMLDivElement>) {
        swipeStartPos = e.touches[0].clientX;
    }
    function touchMoveHandler(e: React.TouchEvent<HTMLDivElement>) {
        swipeLength = e.touches[0].clientX - swipeStartPos;
    }
    function touchEndHandler() {
        if(swipeLength > 50)
            swipeRight();
        else if(swipeLength < -50)
            swipeLeft();
        swipeLength = 0;
    }

    function deleteArticle(article: articleType) {
        setArticlesData(prev => prev.filter(item => item !== article));
    }

    React.useEffect(() => {
        (async function() {
            const {articles = []} = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b483f40812184a8e8e2eb453e42ba60a').then(res => res.data);

            const isDescriptionValid = (description: string) => !(/<\/?[a-z][\s\S]*>/i.test(description));
            const isTitleValid = (title: string) => !(/<\/?[a-z][\s\S]*>/i.test(title));
            const isUrlValid = (url: string) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(url);
            const filteredArticles = articles.filter(({description, title, url, urlToImage}: articleType) => urlToImage && title && description && url && isDescriptionValid(description) && isTitleValid(title) && isUrlValid(url));
            setArticlesData(filteredArticles);
            checkOffsetAndDisableBtn(offset);
        }());
    }, []);

    return (
        <>
            <div className={styles['news-slider']}>
                <div 
                    className={styles['news-slider__line']} 
                    ref={sliderLineRef}
                    style={{left: `${offset}px`}}
                    onTouchStart={touchStartHandler}
                    onTouchMove={touchMoveHandler}
                    onTouchEnd={touchEndHandler}
                >
                    {articlesData.map(article => <NewsSliderItem 
                        key={article.title} 
                        article={article}
                        onError={deleteArticle}
                    />)}
                </div>
            </div>
            <div className={styles['news-btns']}>
                <button className={clsx(styles['news-btns__item'], styles['news-btns__item--left'])} disabled={btnLeftDisabled} onClick={swipeRight}>
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 17H9.84211V24.3914C9.84211 24.5845 9.59562 24.6655 9.48109 24.5101L1 13L9.48109 1.48994C9.59562 1.33452 9.84211 1.41552 9.84211 1.60858V9H25" stroke="#222222"/>
                    </svg> 
                </button>
                <button className={clsx(styles['news-btns__item'], styles['news-btns__item--right'])} disabled={btnRightDisabled} onClick={swipeLeft}>
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 9H15.1579V1.60858C15.1579 1.41552 15.4044 1.33452 15.5189 1.48994L24 13L15.5189 24.5101C15.4044 24.6655 15.1579 24.5845 15.1579 24.3914V17H0" stroke="white"/>
                    </svg>                            
                </button>
            </div>
        </>
    );
}

export default NewsSlider;
