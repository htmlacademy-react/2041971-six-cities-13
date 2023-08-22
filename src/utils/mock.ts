import { commerce, datatype, date, image, internet, lorem } from 'faker';
import { City, Location, Offer, OfferCard } from '../types/offer';
import { Comment, Review } from '../types/reviews';
import { User } from '../types/reviews';
import { address } from 'faker/locale/en';
import { UserData } from '../types/user-data';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORT } from '../const';

export const makeFakeUser = (): User => ({
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
});

export const makeFakeUserData = (): User & UserData => ({
  id: datatype.number(),
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
  email: internet.email(),
  token: datatype.string(),
});

export const makeFakeLocation = (): Location => ({
  zoom: datatype.number({ min: 5, max: 15 }),
  latitude: datatype.number({ min: 5, max: 6, precision: 0.0001 }),
  longitude: datatype.number({ min: 4, max: 10, precision: 0.001 }),
});

export const makeFakeCity = (): City => ({
  name: address.cityName(),
  location: makeFakeLocation(),
});

export const makeFakeFullOffer = (): OfferCard => ({
  id: datatype.string(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  title: lorem.word(10),
  type: commerce.product(),
  price: datatype.number(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  images: Array.from({ length: 2 }, () =>
    image.imageUrl(260, 200, 'cat', true)
  ),
  bedrooms: datatype.number({ min: 1, max: 10 }),
  maxAdults: datatype.number({ min: 1, max: 5 }),
  goods: [commerce.product()],
  description: commerce.productDescription(),
  host: makeFakeUser(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.string(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  title: lorem.word(10),
  type: commerce.product(),
  price: datatype.number(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  previewImage: image.imageUrl(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
});

export const makeFakeOffers = (): Offer[] =>
  Array.from({ length: 10 }, makeFakeOffer);

export const makeFakeNearOffers = (): Offer[] =>
  Array.from({ length: 3 }, makeFakeOffer);

export const makeFakeReview = (): Review => ({
  id: datatype.string(),
  user: makeFakeUser(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  comment: lorem.sentence(),
  date: String(date.recent()),
});

export const makeFakeComment = (): Comment => ({
  ratingData: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  comment: lorem.sentence(),
});

export const makeFakeReviews = (): Review[] => Array.from({ length: 5 }, makeFakeReview);

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  OFFERS: { city: DEFAULT_CITY, offers: makeFakeOffers(), sortingType: DEFAULT_SORT, isOffersDataLoading: false, hasError: false },
  OFFER_BY_ID: { offer: null,
    isOfferDataLoading: false,
    isCommentsLoading: false,
    nearbyOffers: [],
    comments: [],
    comment: null,
    hasOfferError: false,
    hasNearbyError: false,
    hasCommentsLoadingError: false,
    hasCommentSendingError: false },
  FAVORITES: { favorites: makeFakeOffers(), isFavoritesDataLoading: false, hasError: false },
  ...initialState ?? {},
});
