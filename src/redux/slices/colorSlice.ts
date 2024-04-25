import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IColors {
    primary: string;
    secondary: string;
    alternative: string;
    detail: string;
}

export type ColorState = IColors;

const initialState: ColorState = {
    primary: '#ffffff',
    secondary: '#ffffff',
    alternative: '#ffffff',
    detail: '#ffffff',
  };

export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        setColor: (state, action: PayloadAction<IColors>) => {
            state.primary = action.payload.primary
            state.secondary = action.payload.secondary
            state.alternative = action.payload.alternative
            state.detail = action.payload.detail
        },
    },
})

export const { setColor } = colorSlice.actions;

export default colorSlice.reducer