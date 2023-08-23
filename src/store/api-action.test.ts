import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeComment, makeFakeFullOffer, makeFakeOffer, makeFakeOffers, makeFakeReviews } from '../utils/mock';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { checkAuthAction, fetchChangeStatusFavoriteAction, fetchCommentsAction, fetchFavoritesAction, fetchNearbyOffersAction, fetchOfferByIdAction, fetchOffersAction, fetchSendCommentAction, loginAction, logoutAction } from './api-actions';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';


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

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchOfferByIdAction', () => {
    it('should dispatch "fetchOfferByIdAction.pending", "fetchOfferByIdAction.fulfield", when server response 200', async () => {
      const mockOfferById = makeFakeFullOffer();
      const offerId = 'eahvfie';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, mockOfferById);
      await store.dispatch(fetchOfferByIdAction(offerId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferByIdActionFulfield = emittedActions.at(1) as ReturnType<typeof fetchOfferByIdAction.fulfield>;
      expect(extractedActionsTypes).toEqual([
        fetchOfferByIdAction.pending.type,
        fetchOfferByIdAction.fulfilled.type,
      ]);
      expect(fetchOfferByIdActionFulfield.payload).toEqual(mockOfferById);
    });

    it('should dispatch "fetchOfferByIdAction.pending", "fetchOfferByIdAction.rejected", when server response 400', async () => {
      const offerId = 'eahvfie';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(400, []);
      await store.dispatch(fetchOfferByIdAction(offerId));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOfferByIdAction.pending.type,
        fetchOfferByIdAction.rejected.type,
      ]);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.fulfield", when server response 200', async () => {
      const mockComments = makeFakeReviews();
      const offerId = 'eahvfie';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, mockComments);
      await store.dispatch(fetchCommentsAction(offerId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfield = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfield>;
      expect(extractedActionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
      expect(fetchCommentsActionFulfield.payload).toEqual(mockComments);
    });

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.rejected", when server response 400', async () => {
      const offerId = 'eahvfie';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(400, []);
      await store.dispatch(fetchCommentsAction(offerId));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending", "fetchNearbyOffersAction.fulfield", when server response 200', async () => {
      const mockNearby = makeFakeOffers();
      const offerId = 'eahvfie';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}${APIRoute.OffersNearBy}`).reply(200, mockNearby);
      await store.dispatch(fetchNearbyOffersAction(offerId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyOffersActionFulfield = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfield>;
      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);
      expect(fetchNearbyOffersActionFulfield.payload).toEqual(mockNearby);
    });

    it('should dispatch "fetchNearbyOffersAction.pending", "fetchNearbyOffersAction.rejected", when server response 400', async () => {
      const offerId = 'eahvfie';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}${APIRoute.OffersNearBy}`).reply(400, []);
      await store.dispatch(fetchNearbyOffersAction(offerId));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchSendCommentAction', () => {
    it('should dispatch "fetchSendCommentAction.pending", "fetchSendCommentAction.fulfield", when server response 200', async () => {
      const mockComment = makeFakeComment();
      const offerId = 'eahvfie';
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(200);
      await store.dispatch(fetchSendCommentAction({rating: mockComment.ratingData, comment: mockComment.comment, id: offerId}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchSendCommentAction.pending.type,
        fetchCommentsAction.pending.type,
        fetchSendCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchSendCommentAction.pending", "fetchSendCommentAction.rejected", when server response 400', async () => {
      const mockComment = makeFakeComment();
      const offerId = 'eahvfie';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(400);
      await store.dispatch(fetchSendCommentAction({rating: mockComment.ratingData, comment: mockComment.comment, id: offerId}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchSendCommentAction.pending.type,
        fetchSendCommentAction.rejected.type,
      ]);
    });
  });

  describe('fetchChangeStatusFavoriteAction', () => {
    it('should dispatch "fetchChangeStatusFavoriteAction.pending", "fetchChangeStatusFavoriteAction.fulfield", when server response 200', async () => {
      const offerId = 'eahvfie';
      const status = 0;
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${offerId}/${status}`).reply(200);
      await store.dispatch(fetchChangeStatusFavoriteAction({status, id: offerId}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchChangeStatusFavoriteAction.pending.type,
        fetchFavoritesAction.pending.type,
        fetchChangeStatusFavoriteAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchChangeStatusFavoriteAction.pending", "fetchChangeStatusFavoriteAction.rejected", when server response 400', async () => {
      const offerId = 'eahvfie';
      const status = 0;
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}/${offerId}`).reply(400);
      await store.dispatch(fetchChangeStatusFavoriteAction({status, id: offerId}));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchChangeStatusFavoriteAction.pending.type,
        fetchChangeStatusFavoriteAction.rejected.type,
      ]);
    });
  });
});
