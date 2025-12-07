import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersAction, fetchFavoritesAction, loginAction } from '../actions/api-actions';

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default loadingSlice.reducer;
