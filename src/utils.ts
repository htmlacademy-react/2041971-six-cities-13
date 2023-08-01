import { SortingType } from './const';
import { Offer } from './types/offer';

export const sorting = {
  [SortingType.Popular]: (offers: Offer[]) => offers,
  [SortingType.PriceLow]: (offers: Offer[]) => Array.from(offers.values()).sort((a, b) => a.price - b.price),
  [SortingType.PriceHigh]: (offers: Offer[]) => Array.from(offers.values()).sort((a, b) => b.price - a.price),
  [SortingType.TopRated]: (offers: Offer[]) => Array.from(offers.values()).sort((a, b) => b.rating - a.rating),
};
