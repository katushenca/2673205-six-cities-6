import {TState} from '../../types/baseState.ts';
import {createSelector} from '@reduxjs/toolkit';
import {OfferCard} from '../../types/offerCard.ts';

export const selectOffers = (state: TState) => state.offers.offers;
export const selectOffer = (state: TState) => state.offers.offer;
export const selectIsLoading = (state: TState) => state.loading.loading;
export const selectAuthStatus = (state: TState) => state.auth.authStatus;
export const selectAuthUser = (state: TState) => state.auth.authUser;
export const selectCurrentCity = (state: TState) => state.offers.city;
export const selectFavorites = (state: TState) => state.favorites.favorites;
export const selectComments = (state: TState) => state.comments.comments;
export const selectNearbyOffers = (state: TState) => state.nearby.nearbyOffers;
export const selectOfferNotFound = (state: TState) => state.offers.notFound;
export const selectServerError = (state: TState) => state.serverApp.serverError;

export const selectFilteredOffers = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const selectFavoritesGroupedByCity = createSelector(
  [selectFavorites],
  (favorites) => favorites.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, OfferCard[]>)
);

export const makeSelectIsFavoriteOffer = () => createSelector(
  [
    selectFavorites,
    (_state: TState, offerId: string | undefined) => offerId
  ],
  (favorites, offerId) => {
    if (!offerId) {
      return false;
    }
    return favorites.some((fav) => fav.id === offerId);
  }
);
