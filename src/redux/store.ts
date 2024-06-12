import { configureStore } from '@reduxjs/toolkit';
import ownerReducer from './slices/Owner.slice';
import tokenReducer from './slices/token.slice';
import LocalIDReducer from './slices/LocalID.slice';
import LocalReducer from './slices/Local.slice';

const store = configureStore({
  reducer: {
    owner: ownerReducer,
    token: tokenReducer,
    localID: LocalIDReducer,
    local: LocalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;