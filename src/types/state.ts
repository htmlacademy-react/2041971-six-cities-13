import { store } from '../store/index';
import { AuthorizationStatus, SortingType } from '../const';
import { Offer, OfferCard } from '../types/offer';
import { Review } from './reviews';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
}

export type OffersProcess = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  isOffersDataLoading: boolean;
  hasError: boolean;
}

export type OfferIdProcess = {
  offer: OfferCard | null;
  isOfferDataLoading: boolean;
  nearbyOffers: Offer[];
  comments: Review[];
  comment: Comment | null;
}

export type FavoriteProcess = {
  favorites: Offer[];
  isFavoritesDataLoading: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
