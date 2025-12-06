import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {OfferInfo} from '../../types/offerInfo.ts';
import {ApiHandlers} from '../../const.ts';

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
