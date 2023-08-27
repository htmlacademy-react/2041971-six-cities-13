import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortingType } from '../../const';
import { OffersProcess } from '../../types/state';
import { fetchChangeStatusFavoriteAction, fetchOffersAction } from '../api-actions';
import { DEFAULT_CITY, DEFAULT_SORT } from '../../const';

const initialState: OffersProcess = {
  city: DEFAULT_CITY,
  offers: [],
  sortingType: DEFAULT_SORT,
  isOffersDataLoading: false,
  hasError: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSortingType: (state, action: PayloadAction<SortingType>) => {
      state.sortingType = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchChangeStatusFavoriteAction.fulfilled, (state, action) => {
        state.offers = state.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        });
      });
  }
});

export const {changeCity, changeSortingType} = offersProcess.actions;
