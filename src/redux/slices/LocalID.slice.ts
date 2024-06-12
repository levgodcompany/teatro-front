import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  getLocalStorage,
  persistLocalStorage,
} from "../../utilities/localStorage.utility";
import { ILocalID } from "../../services/LocalID.service";


export const initialStateLocalID: ILocalID = {
  id: "",
};

export const LocalIDKey = "local_id";

export const localIDSlice = createSlice({
  name: "local_id",
  initialState: getLocalStorage(LocalIDKey)
    ? JSON.parse(getLocalStorage(LocalIDKey) as string)
    : initialStateLocalID,
  reducers: {
    createLocalID: (_state, action:  PayloadAction<ILocalID>) => {
      clearLocalStorage(LocalIDKey);
      persistLocalStorage<ILocalID>(LocalIDKey, action.payload);
      return action.payload;
    },
    getLocalID: () => {
      const user: ILocalID = getLocalStorage(LocalIDKey)
        ? JSON.parse(getLocalStorage(LocalIDKey) as string)
        : initialStateLocalID;
      return user;
    },
    updateLocalID: (state, action: PayloadAction<ILocalID>) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<ILocalID>(LocalIDKey, result);
      return result;
    },
    resetLocalID: () => {
      clearLocalStorage(LocalIDKey);
      return initialStateLocalID;
    },
  },
});

export const { createLocalID, getLocalID, updateLocalID, resetLocalID } = localIDSlice.actions;

export default localIDSlice.reducer;
