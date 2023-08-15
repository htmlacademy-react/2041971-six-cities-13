import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';

export const getFavorites = (state: State): Offer[] => state[NameSpace.Favorites].favorites;
export const getFavoritesDataLoadingStatus = (state: State): boolean => state[NameSpace.Favorites].isFavoritesDataLoading;
