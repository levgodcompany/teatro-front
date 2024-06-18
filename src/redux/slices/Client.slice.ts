import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClient } from "../../services/Auth.service";



const initialState: IClient = {
  _id: '',
    name: '',
    email: '',
    phone: '',
    token: ''
  };

  export const ClientKey = "client";

  export const clientSlice = createSlice({
    name: "client",
    initialState: initialState,
    reducers: {
      createClient: (state,  action: PayloadAction<IClient>) => {
        state = action.payload;
        return state
      },
      getClient: (state) => {
        return state
      },
      updateClient: (state, action) => {
        state = action.payload;
        return state
      },
      resetClient: (state) => {
        state = initialState
        return initialState;
      },
    },
  });
export const { createClient, getClient, updateClient, resetClient } = clientSlice.actions;

export default clientSlice.reducer