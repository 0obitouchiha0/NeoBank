import React from 'react';

import styles from './styles.module.scss';
import { articleType } from '../types';

interface NewsSliderItemProps {
    article: articleType
    onError: (article: articleType) => void
}

function NewsSliderItem({article, onError}: NewsSliderItemProps) {
    return (
        <a className={styles['news-card']} href={article.url} target="_blank" rel="noreferrer">
            <div className={styles['news-card__img']}>
                <img src={article.urlToImage} alt="news-img" onError={() => onError(article)}/>
            </div>
            <h1 className={styles['news-card__title']}>{article.title}</h1>
            <p className={styles['news-card__description']}>{article.description}</p>
        </a>
    );
}

export default NewsSliderItem;
