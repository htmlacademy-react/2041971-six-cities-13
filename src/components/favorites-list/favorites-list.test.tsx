import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeNearOffers } from '../../utils/mock';

describe('Component: Favorites List', () => {
  it('should render correct', () => {
    const offers = makeFakeNearOffers();
    const favoritesContainerTestId = 'favorites container';
    const favoritesItemTestId = 'favorites item';

    const {withStoreComponent} = withStore(<FavoritesList offers={offers} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByTestId(favoritesContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(favoritesItemTestId).length).toBe(offers.length);
  });
});
