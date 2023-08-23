import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list';
import { makeFakeNearOffers } from '../../utils/mock';

describe('Component: Favorites List', () => {
  it('should render correct', () => {
    const offers = makeFakeNearOffers();
    const favoritesContainerTestId = 'favorites container';
    const favoritesItemTestId = 'favorites item';

    render(<FavoritesList offers={offers} />);
    expect(screen.getAllByTestId(favoritesContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(favoritesItemTestId).length).toBe(offers.length);
  });
});
