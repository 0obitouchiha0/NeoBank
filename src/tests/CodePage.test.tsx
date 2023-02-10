import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Code } from '../pages/code/CodePage';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';


describe('Code', () => {
    it('focus next field after input', () => {
        renderWithProviders(
            <BrowserRouter>
                <Code/>
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 5,
                        applicationId: null
                    }}}
        );
        const inputs = screen.getAllByRole('spinbutton');
        userEvent.type(inputs[0], '0');
        expect(inputs[1]).toHaveFocus();
    });

    it('cant type letters', () => {
        renderWithProviders(
            <BrowserRouter>
                <Code />
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 5,
                        applicationId: null
                    }}}
        );
        const inputs = screen.getAllByRole('spinbutton');
        userEvent.type(inputs[0], 'a');
        expect(inputs[0]).toHaveValue(null);
    });

    it('backspace check', () => {
        renderWithProviders(
            <BrowserRouter>
                <Code />
            </BrowserRouter>, {
                preloadedState: {
                    application: { 
                        isLoading: false,
                        offers: [],
                        stage: 5,
                        applicationId: null
                    }}}
        );
        const inputs = screen.getAllByRole('spinbutton');
        userEvent.type(inputs[0], '1');
        fireEvent.keyDown(inputs[1], {key: 'Backspace'});
        expect(inputs[0]).toHaveFocus();
    });
});