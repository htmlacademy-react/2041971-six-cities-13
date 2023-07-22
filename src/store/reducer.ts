import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList } from './action';

const FIRST_CITY = 'Paris';

const initialState = {
  city: FIRST_CITY,
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state) => {
    state.city;
  })
    .addCase(fillOffersList, (state) => {
      state.offers = offers.find((offer) => offer.city = state.city);
    });
});

export { reducer };
