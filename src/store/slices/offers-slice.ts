import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction, fetchOfferAction, updateFavoriteAction } from '../actions/api-actions';
import { City } from '../../types/city';
import { OfferInfo } from '../../types/offerInfo';

interface OffersState {
  offers: OfferInfo[];
  offer: OfferInfo | null;
  city: City;
}

const initialState: OffersState = {
  offers: [],
  offer: null,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  }
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    fillOffers: (state, action: PayloadAction<OfferInfo[]>) => {
      state.offers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(updateFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const offerIndex = state.offers.findIndex((o) => o.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex] = updatedOffer;
        }
        if (state.offer?.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }
      });
  }
});

export const { changeCity, fillOffers } = offersSlice.actions;
export default offersSlice.reducer;
