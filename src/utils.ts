import { SortingType, RATING_KOEF } from './const';
import { Offer } from './types/offer';

export const sorting = {
  [SortingType.Popular]: (offers: Offer[]) => offers,
  [SortingType.PriceLow]: (offers: Offer[]) => [...offers].sort((a, b) => a.price - b.price),
  [SortingType.PriceHigh]: (offers: Offer[]) => [...offers].sort((a, b) => b.price - a.price),
  [SortingType.TopRated]: (offers: Offer[]) => [...offers].sort((a, b) => b.rating - a.rating),
};

export function getRatingStarsStyle(rating: number): string {
  return `${RATING_KOEF * Math.round(rating)}%`;
}
