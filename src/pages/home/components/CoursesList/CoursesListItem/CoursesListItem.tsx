import React from 'react';

import styles from './styles.module.scss';

interface CoursesListItemProps {
    currency: string,
    course: number
}

function CoursesListItem({currency, course}: CoursesListItemProps) {
    return (
        <li key={currency} className={styles['courses-list__item']}>
            <span className={styles['course-name']}>{currency}:</span>
            <span className={styles['course-value']}>{course}</span>
        </li>
    );
}

export default CoursesListItem;
