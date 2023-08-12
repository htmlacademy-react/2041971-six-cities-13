import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferCard } from '../types/offer';
import { SortingType } from '../const';
import { AuthorizationStatus, AppRoute } from '../const';
import { Comment, Review } from '../types/reviews';

export const changeCity = createAction<{city: string}>('changeCity');
export const fillOffersList = createAction<{offers: Offer[]}>('fillOffersList');
export const changeSortingType = createAction<{type: SortingType}>('changeSortingType');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');
export const loadFavorites = createAction<Offer[]>('loadFavorites');
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
export const loadOfferById = createAction<OfferCard>('loadOfferById');
export const loadNearbyOffers = createAction<Offer[]>('loadNearbyOffers');
export const loadComments = createAction<Review[]>('loadComments');
export const sendComment = createAction<Comment>('sendComment');
