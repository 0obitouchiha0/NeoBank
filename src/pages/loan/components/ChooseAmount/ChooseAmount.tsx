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
        <div className={styles['form-amount']} ref={ref}>
            <div className={styles['form-amount__choose']}>
                <div className={styles['form-amount__choose-title']}>
                    <h1>Customize your card</h1>
                    <h4>Step 1 of 5</h4>
                </div>
                <div className={styles.container}>
                    <h3 className={styles.container__title}>Select amount</h3>
                    <span className={styles.container__current}>{value}</span>
                    <input className={styles.container__input} type="range" min={min} max={max} step={1} value={value} onChange={inputChangeHandler} ref={inputRef}/>
                    <div className={styles.container__borders}>
                        <span className={styles.container__min}>{min}</span>
                        <span className={styles.container__max}>{max}</span>
                    </div>
                </div>
            </div>
            <div className={styles['form-amount__dash']}></div>
            <div className={styles['form-amount__result']}>
                <h2>You have chosen the amount</h2>
                <span>{value}</span>
                <div></div>
            </div>
        </div>
    );
});

ChooseAmount.displayName = 'ChooseAmount';

export default ChooseAmount;