import { store } from '../store/index';
import { AuthorizationStatus, SortingType } from '../const';
import { Offer, OfferCard } from '../types/offer';
import { Review } from './reviews';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    email: string;
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
  isCommentsLoading: boolean;
  isCommentSending: boolean;
  nearbyOffers: Offer[];
  comments: Review[];
  comment: Review | null;
  hasOfferError: boolean;
  hasNearbyError: boolean;
  hasCommentsLoadingError: boolean;
  hasCommentSendingError: boolean;
}

export type FavoriteProcess = {
  favorites: Offer[];
  isFavoritesDataLoading: boolean;
  hasError: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
