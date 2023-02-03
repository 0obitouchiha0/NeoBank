import React from 'react';
import Label from '../Label/Label';
import styles from './styles.module.scss';
import arrowDown from '../../assets/pagesImages/loanPage/arrowDown.svg';

interface SelectProps {
    labelText: string, 
    options: {value: number, text: string}[],
    isRequired: boolean
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(({labelText, options, isRequired, ...rest}, ref) => {
    return (
        <div className={styles.container} ref={ref}>
            <Label text={labelText} isRequired={isRequired} htmlFor="select"/>
            <img src={arrowDown} alt="arrow" />
            <select
                {...rest}
                name="select"
                className={styles.container__select}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>  
                ))}
            </select>
        </div>
    );
});

Select.displayName = 'Select';

export default Select;