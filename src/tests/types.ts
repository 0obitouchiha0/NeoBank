import { PreloadedState } from '@reduxjs/toolkit';
import { RenderOptions } from '@testing-library/react';
import { AppStore, RootState } from '../store/store';

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}