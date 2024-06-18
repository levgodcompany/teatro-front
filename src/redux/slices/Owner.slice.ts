import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOwner } from "../../services/Auth.service";



const initialState: IOwner = {
    name: '',
    email: '',
    phone: '',
    token: ''
  };

  export const OwnerKey = "owner";

  export const ownerSlice = createSlice({
    name: "owner",
    initialState: initialState,
    reducers: {
      createOwner: (state,  action: PayloadAction<IOwner>) => {
        state = action.payload;
        return state
      },
      getOwner: (state) => {
        return state
      },
      updateOwner: (state, action) => {
        state = action.payload;
        return state
      },
      resetOwner: (state) => {
        state = initialState
        return initialState;
      },
    },
  });
export const { createOwner, getOwner, updateOwner, resetOwner } = ownerSlice.actions;

export default ownerSlice.reducer