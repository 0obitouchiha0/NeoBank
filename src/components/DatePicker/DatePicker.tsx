import clsx from 'clsx';
import React from 'react';
import Label from '../Label/Label';
import styles from './styles.module.scss';
import errorImg from '../../assets/pagesImages/loanPage/error.svg';
import correctMarkImg from '../../assets/pagesImages/loanPage/correctMark.svg';

interface DatePickerProps {
    labelText: string, 
    placeholder: string,
    isRequired: boolean,
    error?: string,
    isSubmitted?: boolean,
}

function DatePicker({labelText, placeholder, isRequired, error, isSubmitted, ...rest}: DatePickerProps) {
    return (
        <div className={styles.container}>
            <Label text={labelText} isRequired={isRequired} htmlFor="input"/>
            {isSubmitted && !error && <img src={correctMarkImg} alt={'correct'}/>}
            <input
                {...rest}
                type="date"
                name="input"
                placeholder={placeholder}
                className={clsx(styles.container__input, error && styles['container__input--error'])}
            />
            {error && <>
                <img src={errorImg} alt="error" />
                <span className={styles.container__error}>{error}</span>
            </>}
        </div>
    );
}

export default DatePicker;