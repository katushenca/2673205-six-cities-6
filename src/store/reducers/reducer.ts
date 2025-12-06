import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillOffers, isAuthorized} from '../actions/action.ts';
import {
  checkAuthAction, fetchFavoritesAction,
  fetchOfferAction,
  fetchOffersAction,
  loginAction,
  logoutAction, updateFavoriteAction
} from '../actions/api-actions.ts';
import {BaseState} from '../../types/baseState.ts';
import {AuthorizationStatus} from '../../const.ts';

const initialState : BaseState = {
  offers: [],
  favorites: [],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  loading: false,
  offer: null,
  authStatus: AuthorizationStatus.Unknown,
  error: null,
  authUser: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.loading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.loading = false;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(isAuthorized, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authStatus = AuthorizationStatus.Auth;
      state.authUser = action.payload;
      state.loading = false;
    })
    .addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.authStatus = AuthorizationStatus.Unknown;
    })
    .addCase(loginAction.rejected, (state) => {
      state.loading = false;
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
    })
    .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
    })
    .addCase(fetchFavoritesAction.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchFavoritesAction.rejected, (state) => {
      state.loading = false;
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

      const offerIndex = state.offers.findIndex((o) => o.id === updatedOffer.id);
      if (offerIndex !== -1) {
        state.offers[offerIndex] = updatedOffer;
      }
      if (state.offer && state.offer.id === updatedOffer.id) {
        state.offer = updatedOffer;
      }
    });

});

export default reducer;
