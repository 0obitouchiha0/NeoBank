import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { FormValues } from '../../pages/loan/components/CardForm/CardForm';
import { SecondFormValues } from '../../pages/loanContinuation/components/ContinuationForm/ContinuationForm';

const sendFirstForm = createAsyncThunk(
    'application/sendFirstForm',
    async (application: FormValues) => {
        const formattedData = {
            ...application,
            firstName: application.firstName.trim(),
            lastName: application.lastName.trim(),
            middleName: application.middleName?.trim(),
            email: application.email.trim(),
            passportNumber: String(application.passportNumber), 
            passportSeries: String(application.passportSeries)
        };
        const res = await axios.post('http://localhost:8080/application', formattedData)
            .then(res => res.data)
            .then(res => {
                console.log(res);
                return res;
            });
        return res;
    }
);

const chooseOffer = createAsyncThunk(
    'application/chooseOffer',
    async (offer: offerType) => {
        await axios.post('http://localhost:8080/application/apply', offer);
        return offer.applicationId;
    }
);

const sendSecondForm = createAsyncThunk(
    'application/secondForm',
    async ({application, applicationId}: {application: SecondFormValues, applicationId: number}) => {
        const formattedData = {
            gender: application.gender,
            maritalStatus: application.maritalStatus,
            dependentAmount: application.dependentAmount,
            passportIssueDate: application.passportIssueDate,
            passportIssueBranch: `${String(application.passportIssueBranch).slice(0, 3)}-${String(application.passportIssueBranch).slice(3)}}`,
            employment: {
                employmentStatus: application.employmentStatus,
                employerINN: String(application.employerINN),
                salary: application.salary,
                position: application.position,
                workExperienceTotal: application.workExperienceTotal,
                workExperienceCurrent: application.workExperienceCurrent
            },
            account: '11223344556677889900'
        };
        const res = await axios.put(`http://localhost:8080/application/registration/${applicationId}`, formattedData);
        return res;
    }
);

const confirmPaymentSchedule = createAsyncThunk(
    'application/confirmPaymentSchedule',
    async (applicationId: number) => {
        axios.post(`http://localhost:8080/document/${applicationId}`);
        return 0;
    }
);

const denyApplication = createAsyncThunk(
    'application/denyApplication',
    async (applicationId: number) => {
        axios.post(`http://localhost:8080/document/${applicationId}/deny`);
        return 0;
    }
);

const signApplication = createAsyncThunk(
    'application/signApplication',
    async (applicationId: number) => {
        axios.post(`http://localhost:8080/document/${applicationId}/sign`);
        return 0;
    }
);

export type offerType = {
    applicationId: number,
    requestedAmount: number,
    totalAmount: number,
    term: number,
    monthlyPayment: number,
    rate: number,
    isInsuranceEnabled: boolean,
    isSalaryClient: boolean
};

type applicationSliceType = {
    isLoading: boolean,
    offers: offerType[],
    stage: number,
    applicationId: number | null
}


const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        isLoading: false,
        offers: [],
        stage: 0,
        applicationId: null
    } as applicationSliceType,
    reducers: {
        confirmCode(state) {
            state.stage = 6;
        },
        deleteApplication(state) {
            state.stage = 0;
            state.offers = [];
            state.applicationId = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendFirstForm.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(sendFirstForm.fulfilled, (state, action: PayloadAction<offerType[]>) => {
            state.isLoading = false;
            state.offers = action.payload;
            state.stage = 1;
        });
        builder.addCase(sendFirstForm.rejected, (state) => {
            state.isLoading = false;
            state.stage = 0;
        });
        builder.addCase(chooseOffer.fulfilled, (state, action: PayloadAction<number>) => {
            state.stage = 2;
            state.applicationId = action.payload;
        });
        builder.addCase(sendSecondForm.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(sendSecondForm.fulfilled, (state) => {
            state.isLoading = false;
            state.stage = 3;
        });
        builder.addCase(sendSecondForm.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(confirmPaymentSchedule.fulfilled, (state) => {
            state.stage = 4;
        });
        builder.addCase(denyApplication.fulfilled, (state) => {
            state.stage = 0;
            state.offers = [];
            state.applicationId = null;
        });
        builder.addCase(signApplication.fulfilled, (state) => {
            state.stage = 5;
        });
    }
});

export default applicationSlice.reducer;
export const {confirmCode, deleteApplication} = applicationSlice.actions;
export {sendFirstForm, chooseOffer, sendSecondForm, confirmPaymentSchedule, denyApplication, signApplication};
