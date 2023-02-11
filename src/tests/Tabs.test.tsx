import React from 'react';
import { screen } from '@testing-library/react';
import Tabs from '../pages/loan/components/Tabs/Tabs';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './functions';
import userEvent from '@testing-library/user-event';


describe('TextInput', () => {
    it('first tab is active after render', () => {
        renderWithProviders(
            <BrowserRouter>
                <Tabs />
            </BrowserRouter>, {}
        );
        const activeTab = screen.getByTestId('About card');
        expect(activeTab).toBeInTheDocument();
    });
    it('tab change works', () => {
        renderWithProviders(
            <BrowserRouter>
                <Tabs />
            </BrowserRouter>, {}
        );
        const tabNavLink = screen.getByTestId('Cashback-nav');
        userEvent.click(tabNavLink);
        const expectedActiveTab = screen.getByTestId('Cashback');
        expect(expectedActiveTab).toBeInTheDocument();
    });
});