import { store } from '../store/index';
import { AuthorizationStatus, SortingType } from '../const';
import { Offer, OfferCard } from '../types/offer';
import { Review, Comment } from './reviews';

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
  isCommentsLoading: boolean;
  nearbyOffers: Offer[];
  comments: Review[];
  comment: Comment | null;
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
