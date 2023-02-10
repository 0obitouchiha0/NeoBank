import React from 'react';
import { screen } from '@testing-library/react';
import LoanPage from '../pages/loan/LoanPage';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';


describe('Loan', () => {
    it('if stage is less than 2 banner link text is valid', () => {
        renderWithProviders(
            <BrowserRouter>
                <LoanPage/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 0,
                        applicationId: null
                    }}}
        );
        const bannerLink = screen.getByText('Apply for card');
        expect(bannerLink).toBeInTheDocument();
    });
    it('if stage is bigger than 2 banner link text is valid', () => {
        renderWithProviders(
            <BrowserRouter>
                <LoanPage/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 2,
                        applicationId: null
                    }}}
        );
        const bannerLink = screen.getByText('Continue registration');
        expect(bannerLink).toBeInTheDocument();
    });
});