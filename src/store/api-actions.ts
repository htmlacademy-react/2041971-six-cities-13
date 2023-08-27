import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer, OfferCard } from '../types/offer';
import { APIRoute, AppRoute, EMPTY_OFFERS, EMPTY_FAVORITES } from '../const';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';
import { dropUserEmail, saveUserEmail } from '../services/user';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review } from '../types/reviews';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchOffers',
    async (_arg, {extra: api}) => {
      try {
        const {data} = await api.get<Offer[]>(APIRoute.Offers);
        return data;
      } catch {
        return EMPTY_OFFERS;
      }
    },
  );

export const fetchOfferByIdAction = createAsyncThunk<OfferCard, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchOfferById',
    async (offerId, {extra: api}) => {
      const {data} = await api.get<OfferCard>(`${APIRoute.Offers}/${offerId}`);
      return data;
    },
  );

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchNearbyOffers',
    async (offerId, {extra: api}) => {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}${APIRoute.OffersNearBy}`);
      return data;
    },
  );

export const fetchCommentsAction = createAsyncThunk<Review[], string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchComments',
    async (offerId, {extra: api}) => {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      return data;
    },
  );

export const fetchSendCommentAction = createAsyncThunk<Review | null, {rating: number; comment: FormDataEntryValue; id: string; cb: () => void}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
  'fetchSendComment',
  async ({ rating, comment, id, cb }, { extra: api }) => {
    const response = await api.post<Review>(`${APIRoute.Comments}/${id}`, {rating, comment});
    if (response.status === 201) {
      cb();
    }
    const {data} = response;
    return data;
  },
  );

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchFavorites',
    async (_arg, {extra: api}) => {
      try {
        const {data} = await api.get<Offer[]>(APIRoute.Favorite);
        return data;
      } catch {
        return EMPTY_FAVORITES;
      }
    },
  );

export const fetchChangeStatusFavoriteAction = createAsyncThunk<Offer, {status: number; id: string}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchChangeStatusFavorite',
    async ({status, id}, {extra: api}) => {
      const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);

      return data;
    },
  );

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {
    extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (login, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, login);
    saveToken(data.token);
    saveUserEmail(data.email);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {
    extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUserEmail();
  },
);
