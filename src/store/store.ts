import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import applicationSlice from './slices/applicationSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    application: applicationSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});
const persistor = persistStore(store);


export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type useAppDispatch = typeof store.dispatch
export const useAppDispatch: () => useAppDispatch = useDispatch;

export {store, persistor};