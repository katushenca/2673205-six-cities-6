import {SortType} from '../types/sortType';
import {OfferInfo} from '../types/offerInfo';

export function sortOffers(offers: OfferInfo[], sortType: SortType): OfferInfo[] {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    case SortType.Popular:
    default:
      return offers;
  }
}
