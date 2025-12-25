import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoritesAction, updateFavoriteAction } from '../actions/api-actions';
import { OfferInfo } from '../../types/offerInfo';

interface FavoritesState {
  favorites: OfferInfo[];
}

const initialState: FavoritesState = {
  favorites: []
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(updateFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          const existingIndex = state.favorites.findIndex((o) => o.id === updatedOffer.id);
          if (existingIndex !== -1) {
            state.favorites[existingIndex] = updatedOffer;
          } else {
            state.favorites.push(updatedOffer);
          }
        } else {
          state.favorites = state.favorites.filter((o) => o.id !== updatedOffer.id);
        }
      });
  }
});

export const {clearFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
