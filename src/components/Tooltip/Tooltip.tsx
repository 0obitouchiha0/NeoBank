import React from 'react';
import styles from './styles.module.scss';

interface TooltipProps {
    text: string
}

function Tooltip({text}: TooltipProps) {
    return (
        <span className={styles.prompt}>{text}</span>
    );
}
export default Tooltip;