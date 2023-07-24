import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffersList } from './action';

const FIRST_CITY = 'Paris';

const initialState = {
  city: FIRST_CITY,
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.playload.city;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload.offers.filter((offer) => offer.city.name === state.city);
    });
});

export { reducer };
