import dayjs from 'dayjs';
import { SortingType, RATING_KOEF } from '../const';
import { Offer } from '../types/offer';
import { Review } from '../types/reviews';
import { CITIES } from '../const';

export const sorting = {
  [SortingType.Popular]: (offers: Offer[]) => offers,
  [SortingType.PriceLow]: (offers: Offer[]) => [...offers].sort((a, b) => a.price - b.price),
  [SortingType.PriceHigh]: (offers: Offer[]) => [...offers].sort((a, b) => b.price - a.price),
  [SortingType.TopRated]: (offers: Offer[]) => [...offers].sort((a, b) => b.rating - a.rating),
};

export function getRatingStarsStyle(rating: number): string {
  return `${RATING_KOEF * Math.round(rating)}%`;
}

export function sortByDate(ratingA: Review, ratingB: Review) {
  return dayjs(ratingB.date).diff(ratingA.date);
}

export function isPasswordValid(password: string | undefined) {
  if (
    !password ||
    password.length < 2 ||
    !/\d/.test(password) ||
    !/\D/i.test(password) ||
    false
  ) {
    return false;
  }

  return true;
}

export function getRandomCity(cities: typeof CITIES) {
  return cities[Math.floor(Math.random() * cities.length)];
}
