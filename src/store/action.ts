import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { SortingType } from '../const';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<{city: string}>('changeCity');
export const fillOffersList = createAction<{offers: Offer[]}>('fillOffersList');
export const changeSortingType = createAction<{type: SortingType}>('changeSortingType');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
export const loadFavorites = createAction<{favorites: Offer[]}>('loadFavorites');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
