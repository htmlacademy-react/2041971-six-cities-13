export const Setting = {
  PlacesCount: 312,
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favotites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
