import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSortingType,
  fillOffersList,
  requireAuthorization,
  setOffersDataLoadingStatus,
  loadFavorites,
  loadOfferById,
  loadNearbyOffers,
  loadComments,
  sendComment,
} from './action';
import { Offer, OfferCard } from '../types/offer';
import { SortingType, AuthorizationStatus, RequestStatus } from '../const';
import { fetchOfferByIdAction } from './api-actions';
import { Comment, Review } from '../types/reviews';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortingType.Popular;

type InitialStateType = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  favorites: Offer[];
  offer: OfferCard | null;
  offerFetchingStatus: RequestStatus;
  nearbyOffers: Offer[];
  comments: Review[];
  comment: Comment | null;
}

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  sortingType: DEFAULT_SORT,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  favorites: [],
  offer: null,
  offerFetchingStatus: RequestStatus.Idle,
  nearbyOffers: [],
  comments: [],
  comment: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(changeSortingType, (state, action) => {
      state.sortingType = action.payload.type;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(loadOfferById, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchOfferByIdAction.pending, (state) => {
      state.offerFetchingStatus = RequestStatus.Pending;
    })
    .addCase(fetchOfferByIdAction.fulfilled, (state) => {
      state.offerFetchingStatus = RequestStatus.Success;
    })
    .addCase(fetchOfferByIdAction.rejected, (state) => {
      state.offerFetchingStatus = RequestStatus.Error;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(sendComment, (state, action) => {
      state.comment = action.payload;
    });
});

export { reducer };
