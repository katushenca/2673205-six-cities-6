import {createReducer} from '@reduxjs/toolkit';
import {OfferInfo} from '../../types/offerInfo.ts';
import {City} from '../../types/city.ts';
import {changeCity, fillOffers} from '../actions/action.ts';

const initialState : {
  offers: OfferInfo[];
  city: City;
} = {
  offers: [],
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export default reducer;
