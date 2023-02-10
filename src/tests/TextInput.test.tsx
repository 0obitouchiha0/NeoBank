import React from 'react';
import { screen } from '@testing-library/react';
import TextInput from '../components/TextInput/TextInput';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';
import userEvent from '@testing-library/user-event';


describe('TextInput', () => {
    it('typing is working', () => {
        renderWithProviders(
            <BrowserRouter>
                <TextInput labelText='' placeholder='' isRequired={false}/>
            </BrowserRouter>, {}
        );
        const textInput = screen.getByRole('textbox');
        userEvent.type(textInput, 'asdf');
        expect(textInput).toHaveValue('asdf');
    });
    it('placehoder is valid', () => {
        const placeholderText = 'placeholder';
        renderWithProviders(
            <BrowserRouter>
                <TextInput labelText='' placeholder={placeholderText} isRequired={false}/>
            </BrowserRouter>, {}
        );
        const input = screen.getByPlaceholderText(placeholderText);
        expect(input).toBeInTheDocument;
    });
});