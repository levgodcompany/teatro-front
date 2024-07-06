import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './slices/Client.slice';
import tokenReducer from './slices/token.slice';
import clientIDReducer from './slices/ClientID.slice';
import LocalIDReducer from './slices/LocalID.slice';
import LocalReducer from './slices/Local.slice';

const store = configureStore({
  reducer: {
    client: clientReducer,
    token: tokenReducer,
    localID: LocalIDReducer,
    clientID: clientIDReducer,
    local: LocalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;