import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAction, logoutAction, checkAuthAction } from '../actions/api-actions';
import { AuthorizationStatus } from '../../const';
import {AuthUser} from '../../types/AuthUser.ts';

interface AuthState {
  authStatus: AuthorizationStatus;
  authUser: AuthUser | null;
}

const initialState: AuthState = {
  authStatus: AuthorizationStatus.Unknown,
  authUser: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuthorized: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.authUser = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.authUser = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.authUser = null;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.authUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
        state.authUser = null;
      });
  }
});

export const { isAuthorized: setIsAuthorized } = authSlice.actions;
export default authSlice.reducer;
