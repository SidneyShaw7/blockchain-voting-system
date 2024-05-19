// import storage from 'redux-persist/lib/storage';
// import { PersistConfig } from 'redux-persist';
// import { CombinedState } from '@reduxjs/toolkit';

// import { loginReducer } from '../features/login';
// import { registrationReducer } from '../features/registration';
// import { alertReducer } from '../features/alert';
// import { sidebarReducer } from '../features/sidebar';
// import { votingEventReducer, userEventsReducer } from '../features/manageEvent';

// const rootReducer = {
//   login: loginReducer,
//   registration: registrationReducer,
//   alert: alertReducer,
//   sidebar: sidebarReducer,
//   votingEvent: votingEventReducer,
//   userEvents: userEventsReducer,
// };

// type RootState = CombinedState<typeof rootReducer>;

// const persistConfig: PersistConfig<RootState> = {
//   key: 'root',
//   storage,
//   whitelist: ['login'], // Only persist the login reducer
// };

// export default persistConfig;
// export { rootReducer, RootState };