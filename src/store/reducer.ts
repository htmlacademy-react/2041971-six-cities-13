import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList } from './action';
import { Offer } from '../types/offer';

const FIRST_CITY = 'Paris';

type InitialStateType = {
  city: string;
  offers: Offer[];
}

const initialState: InitialStateType = {
  city: FIRST_CITY,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload.offers;
    });
});

export { reducer };
