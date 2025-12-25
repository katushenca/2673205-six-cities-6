import axios, {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferInfo} from '../../types/offerInfo.ts';
import {ApiHandlers, AuthorizationStatus, SERVER_ERROR_TEXT} from '../../const.ts';
import {AuthUser} from '../../types/AuthUser.ts';
import {LoginData} from '../../types/LoginData.ts';
import {dropToken, saveToken} from '../../api/token.ts';
import {TState} from '../../types/baseState.ts';
import {setIsAuthorized} from '../slices/auth-slice.ts';
import {Review} from '../../types/review.ts';
import {PostComment} from '../../types/postComment.ts';
import {clearFavorites} from '../slices/favorite-slice.ts';
import {clearServerError, setServerError} from '../slices/server-app-slice.ts';

type TExtra = {
  extra: AxiosInstance;
}

const isServerUnavailable = (err: unknown): boolean =>
  axios.isAxiosError(err) && (!err.response);

const handleServerUnavailable = (dispatch: (action: unknown) => void, err: unknown) => {
  if (isServerUnavailable(err)) {
    dispatch(setServerError(SERVER_ERROR_TEXT));
  }
};

export const fetchOffersAction = createAsyncThunk<OfferInfo[], undefined, TExtra>(
  'offers/fetchOffers',
  async (_arg, {extra: api, dispatch}) => {
    try {
      const {data} = await api.get<OfferInfo[]>(ApiHandlers.Offers);
      dispatch(clearServerError());
      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const fetchOfferAction = createAsyncThunk<OfferInfo, string, TExtra>(
  'offers/fetchOffer',
  async (offerId, {extra: api, dispatch}) => {
    try {
      const {data} = await api.get<OfferInfo>(`${ApiHandlers.Offers}/${offerId}`);
      dispatch(clearServerError());
      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const checkAuthAction = createAsyncThunk<AuthUser, undefined, {extra: AxiosInstance}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<AuthUser>(ApiHandlers.Login);
      dispatch(setIsAuthorized(AuthorizationStatus.Auth));
      dispatch(clearServerError());
      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<OfferInfo[], void, {extra: AxiosInstance}>(
  'favorites/fetchFavorites',
  async (_arg, {extra: api, dispatch}) => {
    try {
      const {data: favorites} = await api.get<OfferInfo[]>(ApiHandlers.Favorites);
      dispatch(clearServerError());
      return favorites;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const loginAction = createAsyncThunk<AuthUser, LoginData, {extra: AxiosInstance}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<AuthUser>(ApiHandlers.Login, {email, password});
      saveToken(data.token);

      dispatch(fetchOffersAction());
      dispatch(fetchFavoritesAction());
      dispatch(clearServerError());

      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {extra: AxiosInstance}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete<AuthUser>(ApiHandlers.Logout);
      dispatch(clearServerError());
    } catch (err) {
      handleServerUnavailable(dispatch, err);
    } finally {
      dropToken();
      dispatch(setIsAuthorized(AuthorizationStatus.NoAuth));
      dispatch(clearFavorites());
      dispatch(fetchOffersAction());
    }
  }
);

export const updateFavoriteAction = createAsyncThunk<
  OfferInfo,
  {offerId: string; isFavorite: boolean},
  {extra: AxiosInstance; state: TState}
>(
  'favorites/updateFavorite',
  async ({offerId, isFavorite}, {dispatch, extra: api, getState}) => {
    try {
      const {data} = await api.post<OfferInfo>(
        `${ApiHandlers.Favorites}/${offerId}/${isFavorite ? 1 : 0}`
      );

      const state = getState();
      if (state.offers.offer?.id === offerId) {
        dispatch(fetchOfferAction(offerId));
      }

      dispatch(fetchOffersAction());
      dispatch(fetchFavoritesAction());
      dispatch(clearServerError());

      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, TExtra>(
  'comments/fetchComments',
  async (offerId, {extra: api, dispatch}) => {
    try {
      const {data} = await api.get<Review[]>(`${ApiHandlers.Comments}/${offerId}`);
      dispatch(clearServerError());
      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<OfferInfo[], string, TExtra>(
  'nearby/fetchNearbyOffers',
  async (offerId, {extra: api, dispatch}) => {
    try {
      const {data} = await api.get<OfferInfo[]>(`${ApiHandlers.Offers}/${offerId}/nearby`);
      dispatch(clearServerError());
      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);

export const postCommentAction = createAsyncThunk<
  Review[],
  {offerId: string; commentData: PostComment},
  TExtra
>(
  'comments/postComment',
  async ({offerId, commentData}, {extra: api, dispatch}) => {
    try {
      await api.post(`${ApiHandlers.Comments}/${offerId}`, commentData);
      const {data} = await api.get<Review[]>(`${ApiHandlers.Comments}/${offerId}`);
      dispatch(clearServerError());
      return data;
    } catch (err) {
      handleServerUnavailable(dispatch, err);
      throw err;
    }
  }
);
