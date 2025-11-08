export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Unknown = '*',
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
