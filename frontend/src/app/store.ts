import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../features/login';
import { registrationReducer } from '../features/registration';
import { alertReducer } from '../features/alert';
import { sidebarReducer } from '../features/sidebar';
import { votingEventReducer } from '../features/manageEvent';
import { TypedUseSelectorHook, useDispatch as rawUseDispatch, useSelector as rawUseSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
    alert: alertReducer,
    sidebar: sidebarReducer,
    votingEvent: votingEventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //   serializableCheck: false,
    }),
});

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks that can be used throughout the application instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => rawUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
