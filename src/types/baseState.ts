import {OfferInfo} from './offerInfo.ts';
import {City} from './city.ts';
import {store} from '../store';
import {AuthorizationStatus} from '../const.ts';
import {AuthUser} from './AuthUser.ts';

export type BaseState = {
  offers: OfferInfo[];
  favorites: OfferInfo[];
  offer: OfferInfo | null;
  city: City;
  loading: boolean;
  authStatus: AuthorizationStatus;
  authUser: AuthUser | null;
  error: Error | null;
}

export type TAppDispatch = typeof store.dispatch;
export type TState = ReturnType<typeof store.getState>;
