import { SortingType } from './const';
import { Offer } from './types/offer';

function getWeightForNulldData(dataA, dataB) {

}

export const sorting = {
  [SortingType.Popular]: (offers: Offer[]) => offers,
  [SortingType.PriceLow]: (offers: Offer[]) => offers,
  [SortingType.PriceHigh]: (offers: Offer[]) => offers,
  [SortingType.TopRated]: (offers: Offer[]) => offers,
};
