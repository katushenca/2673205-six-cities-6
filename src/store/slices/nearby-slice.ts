import {createSlice} from '@reduxjs/toolkit';
import {OfferInfo} from '../../types/offerInfo';
import {fetchNearbyOffersAction, fetchOfferAction} from '../actions/api-actions';

type NearbyState = {
  nearbyOffers: OfferInfo[];
};

const initialState: NearbyState = {
  nearbyOffers: [],
};

export const nearbySlice = createSlice({
  name: 'nearby',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.nearbyOffers = [];
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});

export default nearbySlice.reducer;
