import { createAction } from '@reduxjs/toolkit';
import { City, } from '../../types/city.ts';
import {OfferInfo} from '../../types/offerInfo.ts';
import {AuthorizationStatus} from '../../const.ts';

export const changeCity = createAction<City>('changeCity');
export const fillOffers = createAction<OfferInfo[]>('fillOffers');
export const isAuthorized = createAction<AuthorizationStatus>('isAuthorized');
