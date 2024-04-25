import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './slices/colorSlice';

const store = configureStore({
  reducer: {
    colors: colorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;