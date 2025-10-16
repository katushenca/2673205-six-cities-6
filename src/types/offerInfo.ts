import {OfferCard} from './offerCard.ts';
import {City, Location} from './city.ts';
import {Host} from './host.ts';

export type OfferInfo = OfferCard & {
  city: City;
  location: Location;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  maxAdults: number;
  images: string[];
}
