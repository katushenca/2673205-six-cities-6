import {City} from './types/city.ts';
import {SortType} from './types/sortType.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Unknown = '*',
}

export enum ApiHandlers {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ReviewFormSettings {
  MaxLength = 300 as number,
  MinLength = 50 as number,
}

export const RatingOptions = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

export const PageTitles = [
  {location: AppRoute.Main as string, title: 'Главная'},
  {location: AppRoute.Login as string, title: 'Авторизация'},
  {location: AppRoute.Offer as string, title: 'Предложение'},
  {location: AppRoute.Favorites as string, title: 'Избранное'}
];

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const AUTH_TOKEN_KEY = 'six-cities-token';

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const PASSWORD_PATTERN = /(?=.*[a-zA-Z])(?=.*\d)/;

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
  },
  {
    name: 'Cologne',
    location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 }
  },
  {
    name: 'Brussels',
    location: { latitude: 50.846557, longitude: 4.351697, zoom: 13 }
  },
  {
    name: 'Amsterdam',
    location: { latitude: 52.37454, longitude: 4.897976, zoom: 13 }
  },
  {
    name: 'Hamburg',
    location: { latitude: 53.550341, longitude: 10.000654, zoom: 13 }
  },
  {
    name: 'Dusseldorf',
    location: { latitude: 51.225402, longitude: 6.776314, zoom: 13 }
  }
];

export const XTokenHeader = 'X-Token';

export const SortTypeNames: Record<SortType, string> = {
  [SortType.Popular]: 'Popular',
  [SortType.PriceLowToHigh]: 'Price: low to high',
  [SortType.PriceHighToLow]: 'Price: high to low',
  [SortType.TopRatedFirst]: 'Top rated first',
};

export const SERVER_ERROR_TEXT = 'Сервер недоступен (5xx). Попробуйте позже.';
