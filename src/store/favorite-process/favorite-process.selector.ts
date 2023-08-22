import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';

export const getFavorites = (state: State): Offer[] => state[NameSpace.Favorites].favorites;
export const getFavoritesDataLoadingStatus = (state: State): boolean => state[NameSpace.Favorites].isFavoritesDataLoading;
export const getFavoritesCount = (state: State): number => state[NameSpace.Offers].offers.filter((offer) => offer.isFavorite).length;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Favorites].hasError;
