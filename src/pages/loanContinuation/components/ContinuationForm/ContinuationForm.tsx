import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './styles.module.scss';
import Select from '../../../../components/Select/Select';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import NumberInput from '../../../../components/NumberInput/NumberInput';
import Loader from '../../../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { dependentAmountOptions, employmentStatusOptions, errorMessages, genderOptions, maritalStatusOptions, positionOptions } from './data';
import { sendSecondForm } from '../../../../store/slices/applicationSlice';

export interface SecondFormValues {
    gender: 'MALE' | 'FAMALE',
    maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER',
    dependentAmount: number,
    passportIssueDate: string,
    passportIssueBranch: number,
    employmentStatus: 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER',
    employerINN: number,
    salary: number,
    position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER',
    workExperienceTotal: number,
    workExperienceCurrent: number,
}

const schema = yup.object({
    gender: yup.string().required(errorMessages.select).test(function(value: string | undefined) {
        return value ? ['MALE', 'FEMALE'].includes(value) : false;
    }),
    maritalStatus: yup.string().required(errorMessages.select).test(function(value: string | undefined) {
        return value ? ['MARRIED', 'DIVORCED', 'SINGLE', 'WIDOW_WIDOWER'].includes(value) : false;
    }),
    dependentAmount: yup.number().required(errorMessages.select).test(function(value: number | undefined) {
        return value ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value) : false;
    }),
    passportIssueDate: yup.date().typeError(errorMessages.passportIssueDate).required(errorMessages.passportIssueDate),
    passportIssueBranch: yup.string().required(errorMessages.passportIssueBranch).test(function(num) {
        if(!num) return false;
        return /[0-9]{6}/.test(String(num)) && String(num).length === 6 ? true : this.createError({ message: errorMessages.passportIssueBranch});
    }),
    employmentStatus: yup.string().required(errorMessages.select).test(function(value: string | undefined) {
        return value ? ['UNEMPLOYED', 'SELF_EMPLOYED', 'EMPLOYED', 'BUSINESS_OWNER'].includes(value) : false;
    }),
    employerINN: yup.string().required(errorMessages.employerINN).test(function(num) {
        if(!num) return false;
        return /[0-9]{12}/.test(String(num)) && String(num).length === 12 ? true : this.createError({ message: errorMessages.employerINN});
    }),
    salary: yup.number().typeError(errorMessages.salary).required(errorMessages.salary),
    position: yup.string().required(errorMessages.select).test(function(value: string | undefined) {
        return value ? ['WORKER', 'MID_MANAGER', 'TOP_MANAGER', 'OWNER'].includes(value) : false;
    }),
    workExperienceTotal: yup.number().required(errorMessages.workExperienceTotal).max(99),
    workExperienceCurrent: yup.number().required(errorMessages.workExperienceCurrent).max(99)
}).required();

// const defaultValues = {
//     gender: '',
//     maritalStatus: '',
//     dependentAmount: 0,
//     passportIssueDate: '',
//     passportIssueBranch: '',
//     employmentStatus: '',
//     employerINN: 0,
//     salary: 0,
//     position: '',
//     workExperienceTotal: 0,
//     workExperienceCurrent: 0,
// };

interface ContinuationFormProps {
    applicationId: number
}

function ContinuationForm({applicationId}: ContinuationFormProps) {

    const isLoading = useAppSelector(state => state.application.isLoading);
    const dispatch = useAppDispatch(); 

    const { handleSubmit, control, formState: { errors } } = useForm<SecondFormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<SecondFormValues> = (data) => {
        console.log(data);
        dispatch(sendSecondForm({application: data, applicationId}));
    };

    const onError: SubmitErrorHandler<SecondFormValues> = (error) => {
        console.log(error);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={styles.form__baseInfo}>
                <div className={styles['form__baseInfo-item']}>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field}) => <Select {...field} labelText={'What\'s your gender'} isRequired={true} options={genderOptions} error={errors.gender?.message} isDefaultValueEmpty={true}/>}
                    />
                </div>
                <div className={styles['form__baseInfo-item']}>
                    <Controller
                        name="maritalStatus"
                        control={control}
                        render={({ field}) => <Select {...field} labelText={'Your marital status'} isRequired={true} options={maritalStatusOptions} error={errors.maritalStatus?.message} isDefaultValueEmpty={true}/>}
                    />
                </div>
                <div className={styles['form__baseInfo-item']}>
                    <Controller
                        name="dependentAmount"
                        control={control}
                        render={({ field}) => <Select {...field} labelText={'Your number of dependents'} isRequired={true} options={dependentAmountOptions} error={errors.dependentAmount?.message} isDefaultValueEmpty={true}/>}
                    />
                </div>
                <div className={styles['form__baseInfo-item']}>
                    <Controller
                        name="passportIssueDate"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <DatePicker isSubmitted={isSubmitted} {...field} labelText={'Date of issue of the passport'} placeholder={'For Example 19.05.2005'} isRequired={true} error={errors.passportIssueDate?.message}/>}
                    />
                </div>
                <div className={styles['form__baseInfo-item']}>
                    <Controller
                        name="passportIssueBranch"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <NumberInput isSubmitted={isSubmitted} {...field} labelText={'Division code'} placeholder={'000000'} isRequired={true} error={errors.passportIssueBranch?.message}/>}
                    />
                </div>
            </div>
            <h2 className={styles.form__employmentTitle}>Employment</h2>
            <div className={styles.form__employmentInfo}>
                <div className={styles['form__employmentInfo-item']}>
                    <Controller
                        name="employmentStatus"
                        control={control}
                        render={({ field}) => <Select {...field} labelText={'Your employment status'} isRequired={true} options={employmentStatusOptions} error={errors.employmentStatus?.message} isDefaultValueEmpty={true}/>}
                    />
                </div>
                <div className={styles['form__employmentInfo-item']}>
                    <Controller
                        name="employerINN"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <NumberInput isSubmitted={isSubmitted} {...field} labelText={'Your employer INN'} placeholder={'000000000000'} isRequired={true} error={errors.employerINN?.message}/>}
                    />
                </div>
                <div className={styles['form__employmentInfo-item']}>
                    <Controller
                        name="salary"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <NumberInput isSubmitted={isSubmitted} {...field} labelText={'Your salary'} placeholder={'For example 100 000'} isRequired={true} error={errors.salary?.message}/>}
                    />
                </div>
                <div className={styles['form__employmentInfo-item']}>
                    <Controller
                        name="position"
                        control={control}
                        render={({ field}) => <Select {...field} labelText={'Your position'} isRequired={true} options={positionOptions} error={errors.position?.message} isDefaultValueEmpty={true}/>}
                    />
                </div>
                <div className={styles['form__employmentInfo-item']}>
                    <Controller
                        name="workExperienceTotal"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <NumberInput isSubmitted={isSubmitted} {...field} labelText={'Your work experience total'} placeholder={'For example 10'} isRequired={true} error={errors.workExperienceTotal?.message}/>}
                    />
                </div>
                <div className={styles['form__employmentInfo-item']}>
                    <Controller
                        name="workExperienceCurrent"
                        control={control}
                        render={({ field, formState: {isSubmitted} }) => <NumberInput isSubmitted={isSubmitted} {...field} labelText={'Your work experience current'} placeholder={'For example 2'} isRequired={true} error={errors.workExperienceCurrent?.message}/>}
                    />
                </div>
            </div>
            {isLoading ? <Loader /> : <button className={styles.form__btn}>Continue</button>}
        </form>
    );
}

export default ContinuationForm;