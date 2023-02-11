import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Schedule } from '../pages/schedule/SchedulePage';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';


describe('Schedule', () => {
    it('send button is enabled if checkbox is checked', () => {
        renderWithProviders(
            <BrowserRouter>
                <Schedule/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 3,
                        applicationId: null
                    }}}
        );
        const checkbox = screen.getByLabelText('I agree with the payment schedule');
        const sendButton = screen.getByText('Send');
        userEvent.click(checkbox);
        expect(sendButton).toBeEnabled();
    });

    it('send button is disabled if checkbox isnt checked', () => {
        renderWithProviders(
            <BrowserRouter>
                <Schedule/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 3,
                        applicationId: null
                    }}}
        );
        const checkbox = screen.getByLabelText('I agree with the payment schedule');
        const sendButton = screen.getByText('Send');
        userEvent.click(checkbox);
        userEvent.click(checkbox);
        expect(sendButton).toBeDisabled();
    });

    it('deny button opens modal', () => {
        renderWithProviders(
            <BrowserRouter>
                <Schedule/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 3,
                        applicationId: null
                    }}}
        );
        const debyButton = screen.getByText('Deny');
        userEvent.click(debyButton);
        const modal = screen.getByTestId('modal');
        expect(modal).toBeInTheDocument();
    });
});