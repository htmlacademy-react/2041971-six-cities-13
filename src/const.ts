export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';

export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DateFormat = {
  DATE_FORMAT: 'YYYY-MM-DD',
  REVIEW_DATE_FORMAT: 'MMMM YYYY',
};

export enum SortingType {
  Popular = 'Popular',
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum APIRoute {
  Offers = '/offers',
  OffersNearBy = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum RequestStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

export const RATING_KOEF = 20;
export const DEFAULT_CITY = 'Paris';
export const DEFAULT_SORT = SortingType.Popular;

export enum NameSpace {
  Favorites = 'FAVORITES',
  OfferById = 'OFFER_BY_ID',
  Offers = 'OFFERS',
  User = 'USER',
}
