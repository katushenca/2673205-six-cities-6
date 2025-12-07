import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferInfo} from '../../types/offerInfo.ts';
import {ApiHandlers, AuthorizationStatus} from '../../const.ts';
import {AuthUser} from '../../types/AuthUser.ts';
import {LoginData} from '../../types/LoginData.ts';
import {dropToken, saveToken} from '../../api/token.ts';
import {TState} from '../../types/baseState.ts';
import {setIsAuthorized} from '../slices/auth-slice.ts';

type TExtra = {
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<OfferInfo[], undefined, TExtra>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferInfo[]>(ApiHandlers.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<OfferInfo, string, TExtra>(
  'offers/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferInfo>(`${ApiHandlers.Offers}/${offerId}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthUser, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<AuthUser>(ApiHandlers.Login);
    dispatch(setIsAuthorized(AuthorizationStatus.Auth));
    return data;
  },
);

export const loginAction = createAsyncThunk<AuthUser, LoginData, { extra: AxiosInstance }>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<AuthUser>(ApiHandlers.Login, {email, password});
    saveToken(data.token);
    dispatch(fetchOffersAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete<AuthUser>(ApiHandlers.Logout);
    dropToken();
    dispatch(setIsAuthorized(AuthorizationStatus.NoAuth));
    dispatch(fetchOffersAction());
  },
);

export const fetchFavoritesAction = createAsyncThunk<OfferInfo[], void, { extra: AxiosInstance }>(
  'favorites/fetchFavorites',
  async (_arg, {extra: api }) => {
    const { data: favorites } = await api.get<OfferInfo[]>(ApiHandlers.Favorites);
    return favorites;
  }
);

export const updateFavoriteAction = createAsyncThunk<OfferInfo, { offerId: string; isFavorite: boolean }, { extra: AxiosInstance; state: TState}>(
  'favorites/updateFavorite',
  async ({ offerId, isFavorite }, {dispatch, extra: api, getState}) => {
    const handler = ApiHandlers.Favorites;
    const { data } = await api.post<OfferInfo>(`${handler}/${offerId}/${isFavorite ? 1 : 0}`
    );
    const state = getState();
    if (state.offers.offer?.id === offerId) {
      dispatch(fetchOfferAction(offerId));
    }
    dispatch(fetchOffersAction);
    return data;
  }
);
