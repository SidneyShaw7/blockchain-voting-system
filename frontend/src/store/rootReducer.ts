import { combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from '../features/login';
import { registrationReducer } from '../features/registration';
import { userProfileReducer } from '../features/userProfile';
import { organizationsReducer } from '../features/organizations';
import { alertReducer } from '../features/alert';
import { sidebarReducer } from '../features/sidebar';
import { votingEventReducer, userEventsReducer } from '../features/manageEvent';

export const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  alert: alertReducer,
  sidebar: sidebarReducer,
  votingEvent: votingEventReducer,
  userEvents: userEventsReducer,
  userProfile: userProfileReducer,
  organizations: organizationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
