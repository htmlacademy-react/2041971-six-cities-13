import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSortingType,
  fillOffersList,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
  loadFavorites,
} from './action';
import { Offer } from '../types/offer';
import { SortingType, AuthorizationStatus } from '../const';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortingType.Popular;

type InitialStateType = {
  city: string;
  offers: Offer[];
  sortingType: SortingType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  favorites: Offer[];
}

const initialState: InitialStateType = {
  city: DEFAULT_CITY,
  offers: [],
  sortingType: DEFAULT_SORT,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  favorites: [],
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});

export { reducer };
