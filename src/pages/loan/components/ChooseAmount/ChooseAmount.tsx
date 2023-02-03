import React from 'react';
import styles from './styles.module.scss';

interface ChooseAmountProps {
    min: number, 
    max: number, 
    value: number, 
    onChange: (value: number) => void
}

const ChooseAmount = React.forwardRef<HTMLDivElement, ChooseAmountProps>(({min, max, value, onChange}, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if(inputRef.current) {
            inputRef.current.style.backgroundSize = `${value * 100 / max}% 100%`;
        }
    }, [value]);

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = +e.target.value;
        onChange(newValue);
    }

    return (
        <div className={styles.container} ref={ref}>
            <h3 className={styles.container__title}>Select amount</h3>
            <span className={styles.container__current}>{value}</span>
            <input className={styles.container__input} type="range" min={min} max={max} step={1} value={value} onChange={inputChangeHandler} ref={inputRef}/>
            <div className={styles.container__borders}>
                <span className={styles.container__min}>{min}</span>
                <span className={styles.container__max}>{max}</span>
            </div>
        </div>
    );
});

ChooseAmount.displayName = 'ChooseAmount';

export default ChooseAmount;