import React from 'react';
import Label from '../Label/Label';
import styles from './styles.module.scss';
import arrowDown from '../../assets/pagesImages/loanPage/arrowDown.svg';
import errorImg from '../../assets/pagesImages/loanPage/error.svg';
import clsx from 'clsx';

interface SelectProps {
    labelText: string, 
    options: {value: number | string, text: string}[],
    isRequired: boolean,
    error?: string,
    isDefaultValueEmpty?: boolean
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(({labelText, options, isRequired, isDefaultValueEmpty, error, ...rest}, ref) => {
    console.log(error);
    return (
        <div className={styles.container} ref={ref}>
            <Label text={labelText} isRequired={isRequired} htmlFor="select"/>
            <select
                {...rest}
                name="select"
                className={clsx(styles.container__select, error && styles['container__select--error'])}
            >
                {isDefaultValueEmpty && <option value="" selected disabled hidden></option>}
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>  
                ))}
            </select>
            {error 
                ? <>
                    <img src={errorImg} alt="error" className={styles.container__errorImg}/>
                    <span className={styles.container__error}>{error}</span>
                </>
                : <img src={arrowDown} alt="arrow" className={styles.container__arrow}/>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;