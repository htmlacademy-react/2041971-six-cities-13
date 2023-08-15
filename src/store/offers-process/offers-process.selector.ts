import { NameSpace, SortingType } from '../../const';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.Offers].city;
export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getSortingType = (state: State): SortingType => state[NameSpace.Offers].sortingType;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
