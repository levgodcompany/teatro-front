import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  getLocalStorage,
  persistLocalStorage,
} from "../../utilities/localStorage.utility";

export interface IToken {
    token: string;
}

export const initialStateToken: IToken = {
  token: "",
};

export const UserKey = "token";

export const userSlice = createSlice({
  name: "token",
  initialState: getLocalStorage(UserKey)
    ? JSON.parse(getLocalStorage(UserKey) as string)
    : initialStateToken,
  reducers: {
    createToken: (_state, action:  PayloadAction<IToken>) => {
      clearLocalStorage(UserKey);
      persistLocalStorage<IToken>(UserKey, action.payload);
      return action.payload;
    },
    getToken: () => {
      const user: IToken = getLocalStorage(UserKey)
        ? JSON.parse(getLocalStorage(UserKey) as string)
        : initialStateToken;
      return user;
    },
    updateToken: (state, action: PayloadAction<IToken>) => {
      const result = { ...state, ...action.payload };
      persistLocalStorage<IToken>(UserKey, result);
      return result;
    },
    resetToken: () => {
      clearLocalStorage(UserKey);
      return initialStateToken;
    },
  },
});

export const { createToken, updateToken, resetToken, getToken } = userSlice.actions;

export default userSlice.reducer;
