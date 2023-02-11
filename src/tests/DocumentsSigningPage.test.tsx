import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';
import { DocumentsSigning } from '../pages/documentsSigningPage/DocumentsSigningPage';

describe('DocumentsSigning', () => {
    it('send button is enabled if checkbox is checked', () => {
        renderWithProviders(
            <BrowserRouter>
                <DocumentsSigning/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 4,
                        applicationId: null
                    }}}
        );
        const checkbox = screen.getByLabelText('I agree');
        const sendButton = screen.getByText('Send');
        userEvent.click(checkbox);
        expect(sendButton).toBeEnabled();
    });

    it('send button is disabled if checkbox isnt checked', () => {
        renderWithProviders(
            <BrowserRouter>
                <DocumentsSigning/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 4,
                        applicationId: null
                    }}}
        );
        const checkbox = screen.getByLabelText('I agree');
        const sendButton = screen.getByText('Send');
        userEvent.click(checkbox);
        userEvent.click(checkbox);
        expect(sendButton).toBeDisabled();
    });

    it('file link has href', () => {
        renderWithProviders(
            <BrowserRouter>
                <DocumentsSigning/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 4,
                        applicationId: null
                    }}}
        );
        const link = screen.getByTestId('informationFileLink');
        expect(link).toHaveAttribute('href');
    });
});