import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const changeCity = createAction<{city: string}>('changeCity');
export const fillOffersList = createAction<{offers: Offer[]}>('fillOffersList');
