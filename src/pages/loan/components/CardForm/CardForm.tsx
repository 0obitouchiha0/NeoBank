import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './styles.module.scss';
import ChooseAmount from '../ChooseAmount/ChooseAmount';
import Select from '../../../../components/Select/Select';
import TextInput from '../../../../components/TextInput/TextInput';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import NumberInput from '../../../../components/NumberInput/NumberInput';
import Loader from '../../../../components/Loader/Loader';
import {amountBorders, termOptions, errorMessages} from './data';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { sendFirstForm } from '../../../../store/slices/applicationSlice';

export interface FormValues {
    amount: number,
    term: number,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    birthdate: Date,
    passportSeries: number,
    passportNumber: number
}

const schema = yup.object({
    amount: yup.number().required().min(amountBorders.min).max(amountBorders.max),
    term: yup.number().required().test(function(value: number | undefined) {
        return value ? [6, 12, 18, 24].includes(value) : false;
    }),
    firstName: yup.string().required(errorMessages.firstName),
    lastName: yup.string().required(errorMessages.lastName),
    middleName: yup.string().required(),
    email: yup.string().required(errorMessages.email).email(errorMessages.email),
    birthdate: yup.date().typeError(errorMessages.birthdate).required(errorMessages.birthdate).test(function(value: Date | undefined) {
        if(!value) return false;
        return new Date(value.getFullYear() + 18, value.getMonth(), value.getDate()) <= new Date() ? true : this.createError({ message: errorMessages.birthdate});
    }),
    passportSeries: yup.string().required(errorMessages.passportSeries).test(function(num) {
        if(!num) return false;
        return /[0-9]{4}/.test(String(num)) && String(num).length === 4 ? true : this.createError({ message: errorMessages.passportSeries});
    }),
    passportNumber: yup.string().required(errorMessages.passportNumber).test(function(num) {
        if(!num) return false;
        return /[0-9]{6}/.test(String(num)) && String(num).length === 6 ? true : this.createError({ message: errorMessages.passportNumber});
    }),
}).required();

const defaultValues = {
    amount: 307500,
    term: 6,
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    birthdate: new Date(),
    passportSeries: 0,
    passportNumber: 0
};

function CardForm() {

    const isLoading = useAppSelector(state => state.application.isLoading);
    const dispatch = useAppDispatch(); 

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(sendFirstForm(data));
    };

    const onError: SubmitErrorHandler<FormValues> = (error) => {
        console.log(error);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
            <Controller
                name="amount"
                control={control}
                render={({ field }) => <ChooseAmount {...field} min={amountBorders.min} max={amountBorders.max}/>}
            />
            <div className={styles['form-info']}>
                <h2 className={styles['form-info__title']}>Contact Information</h2>
                <div className={styles['form-info__inputs']}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <TextInput isSubmitted={isSubmitted} {...field} labelText={'Your last name'} placeholder={'For Example Doe'} isRequired={true} error={errors.firstName?.message}/>}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <TextInput isSubmitted={isSubmitted} {...field} labelText={'Your first name'} placeholder={'For Example Jhon'} isRequired={true} error={errors.lastName?.message}/>}
                    />
                    <Controller
                        name="middleName"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <TextInput isSubmitted={isSubmitted} {...field} labelText={'Your patronymic'} placeholder={'For Example Victorovich'} isRequired={true}/>}
                    />
                    <Controller
                        name="term"
                        control={control}
                        render={({ field}) => <Select {...field} labelText={'Select term'} isRequired={true} options={termOptions}/>}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <TextInput isSubmitted={isSubmitted} {...field}  labelText={'Your email'} placeholder={'test@gmail.com'} isRequired={true} error={errors.email?.message}/>}
                    />
                    <Controller
                        name="birthdate"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <DatePicker isSubmitted={isSubmitted} {...field} labelText={'Your date of birth'} placeholder={'For Example 19.05.2005'} isRequired={true} error={errors.birthdate?.message}/>}
                    />
                    <Controller
                        name="passportSeries"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <NumberInput isSubmitted={isSubmitted} {...field} labelText={'Your passport series'} placeholder={'0000'} isRequired={true} error={errors.passportSeries?.message}/>}
                    />
                    <Controller
                        name="passportNumber"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <NumberInput isSubmitted={isSubmitted} {...field} labelText={'Your passport number'} placeholder={'000000'} isRequired={true} error={errors.passportNumber?.message}/>}
                    />
                </div>
            </div>
            {isLoading ? <Loader /> : <button type="submit" className={styles.form__submit}>Continue</button>}
        </form>
    );
}

export default CardForm;