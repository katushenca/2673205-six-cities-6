import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api/api.ts';
import offersReducer from './slices/offers-slice';
import favoriteReducer from './slices/favorite-slice';
import authReducer from './slices/auth-slice';
import loadingReducer from './slices/loading-slice';
import commentsReducer from './slices/comments-slice';
import nearbyReducer from './slices/nearby-slice';
import serverAppReducer from './slices/server-app-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    favorites: favoriteReducer,
    auth: authReducer,
    loading: loadingReducer,
    comments: commentsReducer,
    nearby: nearbyReducer,
    serverApp: serverAppReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
