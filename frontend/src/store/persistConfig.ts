import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist';
import { rootReducer } from './rootReducer';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  whitelist: ['login'], // Only persist the login reducer
};

export default persistConfig;
