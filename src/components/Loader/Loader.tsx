import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

export default function Loader() {
    return (
        <div className={clsx(styles.loader)}><span></span></div>
    );
}
