import React from 'react';
import clsx from 'clsx';
import Label from '../Label/Label';
import styles from './styles.module.scss';
import errorImg from '../../assets/pagesImages/loanPage/error.svg';
import correctMarkImg from '../../assets/pagesImages/loanPage/correctMark.svg';

interface TextInputProps {
    labelText: string, 
    placeholder: string,
    isRequired: boolean,
    error?: string,
    isSubmitted?: boolean,
}

const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(({labelText, placeholder, isRequired, error, isSubmitted, ...rest}, ref) => {
    return (
        <div className={styles.container} ref={ref}>
            <Label text={labelText} isRequired={isRequired} htmlFor="input"/>
            {isSubmitted && !error && <img src={correctMarkImg} alt={'correct'}/>}
            <input
                {...rest}
                type="text"
                name="input" 
                placeholder={placeholder}
                className={clsx(styles.container__input, error && styles['container__input--error'])}
            />
            {error && <>
                <img src={errorImg} alt="error"/>
                <span className={styles.container__error}>{error}</span>
            </>}
        </div>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;