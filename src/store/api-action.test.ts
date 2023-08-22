import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffers } from '../utils/mock';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { checkAuthAction, fetchFavoritesAction, fetchOffersAction } from './api-actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({OFFERS: { offers: []}});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);
      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfield", when server response 200', async () => {
      const mockOffers = makeFakeOffers();
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);
      await store.dispatch(fetchOffersAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfield = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfield>;
      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfield.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);
      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfield", when server response 200', async () => {
      const mockFavorites = makeFakeOffers();
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);
      await store.dispatch(fetchFavoritesAction());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfield = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfield>;
      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(fetchFavoritesActionFulfield.payload).toEqual(mockFavorites);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);
      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });
});
