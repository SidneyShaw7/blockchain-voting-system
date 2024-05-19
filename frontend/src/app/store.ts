// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import { loginReducer } from '../features/login';
// import { registrationReducer } from '../features/registration';
// import { alertReducer } from '../features/alert';
// import { sidebarReducer } from '../features/sidebar';
// import { votingEventReducer, userEventsReducer } from '../features/manageEvent';
// import { TypedUseSelectorHook, useDispatch as rawUseDispatch, useSelector as rawUseSelector } from 'react-redux';
// import persistConfig from './persistConfig';

// const rootReducer = combineReducers({
//   login: loginReducer,
//   registration: registrationReducer,
//   alert: alertReducer,
//   sidebar: sidebarReducer,
//   votingEvent: votingEventReducer,
//   userEvents: userEventsReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       // serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);

// // Type definitions for RootState and AppDispatch
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Typed hooks that can be used throughout the application instead of plain `useDispatch` and `useSelector`
// export const useDispatch = () => rawUseDispatch<AppDispatch>();
// export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
