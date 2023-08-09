import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSortingType,
  fillOffersList,
  requireAuthorization,
  setOffersDataLoadingStatus,
  loadFavorites,
  loadOfferById,
} from './action';
import { Offer, OfferCard } from '../types/offer';
import { SortingType, AuthorizationStatus } from '../const';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortingType.Popular;

type InitialStateType = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  favorites: Offer[];
  offer: OfferCard;
}

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  sortingType: DEFAULT_SORT,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  favorites: [],
  offer: {},
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
    });
});

export { reducer };
