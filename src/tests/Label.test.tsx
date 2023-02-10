import React from 'react';
import { screen } from '@testing-library/react';
import Label from '../components/Label/Label';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';


describe('Label', () => {
    it('label is valid', () => {
        const labelText = 'label';
        renderWithProviders(
            <BrowserRouter>
                <Label text={labelText} isRequired={false} htmlFor=""/>
            </BrowserRouter>, {}
        );
        const label = screen.getByText(labelText);
        expect(label).toBeInTheDocument();
    });
    it('required label is valid', () => {
        renderWithProviders(
            <BrowserRouter>
                <Label text='' isRequired={true} htmlFor=""/>
            </BrowserRouter>, {}
        );
        const star = screen.getByTestId('labelRequiredStar');
        expect(star).toBeInTheDocument;
    });
});