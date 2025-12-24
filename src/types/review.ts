import {Host} from './host.ts';

export type Review = {
  id: string;
  date: string;
  user: Host;
  rating: number;
  comment: string;
};
