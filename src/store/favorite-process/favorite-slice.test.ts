import { favoriteProcess } from './favorite-process.slice';
import { makeFakeOffers } from '../../utils/mock';
import { fetchFavoritesAction } from '../api-actions';

const fakeFavorites = makeFakeOffers();

describe('FavoriteProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: fakeFavorites,
      isFavoritesDataLoading: false,
      hasError: false,
    };
    const result = favoriteProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty axtion and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
      isFavoritesDataLoading: false,
      hasError: false,
    };
    const result = favoriteProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoritesDataLoading" to "true", "hasError" to "false" with "fetchFavoritesAction.panding"', () => {
    const expectedState = {
      favorites: [],
      isFavoritesDataLoading: true,
      hasError: false,
    };
    const result = favoriteProcess.reducer(undefined, fetchFavoritesAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with favorites, "isFavoritesDataLoading" to "false" with "fetchFavoritesAction.fullfilled"', () => {
    const expectedState = {
      favorites: fakeFavorites,
      isFavoritesDataLoading: false,
      hasError: false,
    };
    const result = favoriteProcess.reducer(undefined, fetchFavoritesAction.fulfilled(fakeFavorites, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoritesDataLoading" to "false", "hasError" to "true" with "fetchFavoritesAction.rejected"', () => {
    const expectedState = {
      favorites: [],
      isFavoritesDataLoading: false,
      hasError: true,
    };
    const result = favoriteProcess.reducer(undefined, fetchFavoritesAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
