import React from 'react';
import clsx from 'clsx';
import Label from '../Label/Label';
import styles from './styles.module.scss';
import errorImg from '../../assets/pagesImages/loanPage/error.svg';
import correctMarkImg from '../../assets/pagesImages/loanPage/correctMark.svg';

interface NumberInputProps {
    labelText: string, 
    placeholder: string,
    isRequired: boolean,
    error?: string,
    isSubmitted?: boolean,
    value?: number
}

const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(({labelText, placeholder, isRequired, error, isSubmitted, ...rest}, ref) => {
    return (
        <div className={styles.container} ref={ref}>
            <Label text={labelText} isRequired={isRequired} htmlFor="input"/>
            {isSubmitted && !error && <img src={correctMarkImg} alt={'correct'}/>}
            <input
                {...rest}
                type="number"
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
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;