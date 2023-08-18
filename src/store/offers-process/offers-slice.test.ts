import { SortingType } from '../../const';
import { offersProcess, changeCity, changeSortingType } from './offers-process.slice';
import { makeFakeOffers, makeFakeCity } from '../../utils/mock';
import { fetchOffersAction } from '../api-actions';

const fakeOffers = makeFakeOffers();
const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT = SortingType.Popular;

describe('OffersProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: 'Amsterdam',
      offers: fakeOffers,
      sortingType: SortingType.TopRated,
      isOffersDataLoading: false,
      hasError: false,
    };
    const result = offersProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty axtion and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: DEFAULT_CITY,
      offers: [],
      sortingType: DEFAULT_SORT,
      isOffersDataLoading: false,
      hasError: false,
    };
    const result = offersProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const city = makeFakeCity().name;
    const initialState = {
      city: DEFAULT_CITY,
      offers: [],
      sortingType: DEFAULT_SORT,
      isOffersDataLoading: false,
      hasError: false,
    };
    const expectedState = {
      ...initialState,
      city,
    };
    const result = offersProcess.reducer(initialState, {type: changeCity, payload: city});
    expect(result).toEqual(expectedState);
  });

  it('should change sorting type with "changeSortingType" action', () => {
    const initialState = {
      city: DEFAULT_CITY,
      offers: [],
      sortingType: DEFAULT_SORT,
      isOffersDataLoading: false,
      hasError: false,
    };
    const expectedState = {
      ...initialState,
      sortingType: SortingType.PriceLow,
    };
    const result = offersProcess.reducer(initialState, {type: changeSortingType, payload: SortingType.PriceLow});
    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "true", "hasError" to "false" with "fetchOffersAction.panding"', () => {
    const expectedState = {
      city: DEFAULT_CITY,
      offers: [],
      sortingType: DEFAULT_SORT,
      isOffersDataLoading: true,
      hasError: false,
    };
    const result = offersProcess.reducer(undefined, fetchOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offers, "isOffersDataLoading" to "false" with "fetchOffersAction.fullfilled"', () => {
    const expectedState = {
      city: DEFAULT_CITY,
      offers: fakeOffers,
      sortingType: DEFAULT_SORT,
      isOffersDataLoading: false,
      hasError: false,
    };
    const result = offersProcess.reducer(undefined, fetchOffersAction.fulfilled(fakeOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "false", "hasError" to "true" with "fetchOffersAction.rejected"', () => {
    const expectedState = {
      city: DEFAULT_CITY,
      offers: [],
      sortingType: DEFAULT_SORT,
      isOffersDataLoading: false,
      hasError: true,
    };
    const result = offersProcess.reducer(undefined, fetchOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

//   it('should change favorite status "fetchChangeStatusFavoriteAction.fulfilled"', () => {
//     const expectedState = {
//       city: DEFAULT_CITY,
//       offers: fakeOffers,
//       sortingType: DEFAULT_SORT,
//       isOffersDataLoading: false,
//       hasError: false,
//     };
//     const result = offersProcess.reducer(undefined, fetchChangeStatusFavoriteAction.fulfilled(fakeOffers[0], '', {status: 1, id: fakeOffer.id}));
//     expect(result).toEqual(expectedState);
//   });
});
