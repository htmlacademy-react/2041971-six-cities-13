import { NameSpace } from '../../const';
import { Offer, OfferCard } from '../../types/offer';
import { Review } from '../../types/reviews';
import { State } from '../../types/state';

export const getOfferById = (state: State): OfferCard | null => state[NameSpace.OfferById].offer;
export const getOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.OfferById].isOfferDataLoading;
export const getCommentsDataLoadingStatus = (state: State): boolean => state[NameSpace.OfferById].isCommentsLoading;
export const getCommentDataSendingStatus = (state: State): boolean => state[NameSpace.OfferById].isCommentSending;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.OfferById].nearbyOffers;
export const getComments = (state: State): Review[] => state[NameSpace.OfferById].comments;
export const getOfferErrorStatus = (state: State): boolean => state[NameSpace.OfferById].hasOfferError;
export const getNearbyErrorStatus = (state: State): boolean => state[NameSpace.OfferById].hasNearbyError;
export const getCommentsLoadingErrorStatus = (state: State): boolean => state[NameSpace.OfferById].hasCommentsLoadingError;
export const getCommentSendingErrorStatus = (state: State): boolean => state[NameSpace.OfferById].hasCommentSendingError;
