import {OfferInfo} from './offerInfo.ts';
import {City} from './city.ts';
import {store} from '../store';

export type BaseState = {
  offers: OfferInfo[];
  offer: OfferInfo | null;
  city: City;
  loading: boolean;
}

export type TAppDispatch = typeof store.dispatch;
export type TState = ReturnType<typeof store.getState>;
