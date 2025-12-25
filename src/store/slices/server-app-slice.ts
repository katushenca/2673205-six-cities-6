import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AppState = {
  serverError: string | null;
};

const initialState: AppState = {
  serverError: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setServerError: (state, action: PayloadAction<string | null>) => {
      state.serverError = action.payload;
    },
    clearServerError: (state) => {
      state.serverError = null;
    }
  }
});

export const {setServerError, clearServerError} = appSlice.actions;
export default appSlice.reducer;
