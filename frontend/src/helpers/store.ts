import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from '../features/authentication';
import { registrationReducer } from '../features/registration';
import { alertReducer } from '../features/alert';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    registration: registrationReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
