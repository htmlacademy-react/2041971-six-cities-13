import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, OfferCard } from '../types/offer';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import {
  fillOffersList,
  loadFavorites,
  requireAuthorization,
  setOffersDataLoadingStatus,
  redirectToRoute,
  loadOfferById,
} from './action';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(fillOffersList({offers: data}));
    },
  );

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchOfferById',
    async (offerId, {dispatch, extra: api}) => {
      const {data} = await api.get<OfferCard>(`${APIRoute.Offers}/${offerId}`);
      dispatch(loadOfferById(data));
    },
  );

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchFavorites',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Faforite);
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadFavorites(data));
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (login, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, login);
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();

    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
