import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: Favorites Empty', () => {
  it('should render correct', () => {
    render(<FavoritesEmpty />);
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips/i)).toBeInTheDocument();
  });
});
