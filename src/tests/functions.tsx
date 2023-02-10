import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import { ExtendedRenderOptions } from './types';

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = { 
            application: { 
                isLoading: false,
                offers: [],
                stage: 4,
                applicationId: null
            }},
        store = setupStore(preloadedState)
    }: ExtendedRenderOptions
) {
    function MyProvider({ children }: {children: React.ReactElement}) {
        return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: MyProvider }) };
}