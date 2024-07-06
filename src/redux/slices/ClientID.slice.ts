import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  getLocalStorage,
  persistLocalStorage,
} from "../../utilities/localStorage.utility";

export interface IClientID {
    id: string;
}

export const initialStateClinetID: IClientID = {
  id: "",
};

export const ClientID = "id_client";

export const clienyIDSlice = createSlice({
  name: "id_client",
  initialState: getLocalStorage(ClientID)
    ? JSON.parse(getLocalStorage(ClientID) as string)
    : initialStateClinetID,
  reducers: {
    createClientID: (_state, action:  PayloadAction<IClientID>) => {
      clearLocalStorage(ClientID);
      persistLocalStorage<IClientID>(ClientID, action.payload);
      return action.payload;
    },
    getClientID: () => {
      const user: IClientID = getLocalStorage(ClientID)
        ? JSON.parse(getLocalStorage(ClientID) as string)
        : initialStateClinetID;
      return user;
    },
    updateClientID: (state, action: PayloadAction<IClientID>) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<IClientID>(ClientID, result);
      return result;
    },
    resetClientID: () => {
      clearLocalStorage(ClientID);
      return initialStateClinetID;
    },
  },
});

export const { createClientID, updateClientID, resetClientID, getClientID } = clienyIDSlice.actions;

export default clienyIDSlice.reducer;
