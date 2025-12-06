import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillOffers} from '../actions/action.ts';
import {fetchOfferAction, fetchOffersAction} from '../actions/api-actions.ts';
import {BaseState} from '../../types/baseState.ts';

const initialState : BaseState = {
  offers: [],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  loading: false,
  offer: null
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
    });
});

export default reducer;
