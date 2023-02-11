import React from 'react';
import InfoCardWithImg from './InfoCardWithImg/InfoCardWithImg';
import InfoCardWithoutImg from './InfoCardWithoutImg/InfoCardWithoutImg';
import styles from './styles.module.scss';

interface InfoCardProps {
    color: string,
    title: string,
    description: string,
    area: string
    img?: string,
}

function InfoCard({title, description, img, color, area}: InfoCardProps) {
    return (
        <div className={styles['info-card']} style={{background: color, gridArea: area}}>
            {img ?
                <InfoCardWithImg title={title} description={description} img={img} />
                : <InfoCardWithoutImg title={title} description={description} />}
        </div>
    );
}

export default InfoCard;