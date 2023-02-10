import React from 'react';
import { screen } from '@testing-library/react';
import NumberInput from '../components/NumberInput/NumberInput';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';
import userEvent from '@testing-library/user-event';


describe('NumberInput', () => {
    it('typing letters is not working', () => {
        renderWithProviders(
            <BrowserRouter>
                <NumberInput labelText='' placeholder='' isRequired={false}/>
            </BrowserRouter>, {}
        );
        const input = screen.getByRole('spinbutton');
        userEvent.type(input, 'asd');
        expect(input).toHaveValue(null);
    });
    it('typing digits is working', () => {
        renderWithProviders(
            <BrowserRouter>
                <NumberInput labelText='' placeholder='' isRequired={false}/>
            </BrowserRouter>, {}
        );
        const input = screen.getByRole('spinbutton');
        userEvent.type(input, '213');
        expect(input).toHaveValue(213);
    });
});