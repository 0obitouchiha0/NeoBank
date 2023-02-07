import React from 'react';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import styles from './styles.module.scss';

interface FeaturesItemProps {
    title: string, 
    description: string, 
    prompt: string
}

function FeaturesItem({title, description, prompt}: FeaturesItemProps) {

    const [isHovered, setIsHovered] = React.useState(false);

    function hover() {
        setIsHovered(true);
    }

    function unhover() {
        setIsHovered(false);
    }

    return (
        <li className={styles.item} onMouseOver={hover} onMouseLeave={unhover}>
            <h4 className={styles.item__title}>{title}</h4>
            <span className={styles.item__description}>{description}</span>
            {isHovered && <Tooltip text={prompt}/>}
        </li>
    );
}
export default FeaturesItem; 