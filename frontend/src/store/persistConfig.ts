// import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { PersistConfig } from 'redux-persist';
import { rootReducer } from './rootReducer';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: storageSession,
  whitelist: ['login'], // only persist the login reducer
};

export default persistConfig;
