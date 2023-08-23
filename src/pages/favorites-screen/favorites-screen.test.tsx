import { render, screen } from '@testing-library/react';
import FavoritesScreen from './favorites-screen';
import { withHistory } from '../../utils/mock-component';

describe('Component: Favorites Screen', () => {
  it('should render correct', () => {
    const favoritesContainerTestId = 'favorites-container';
    const preparedComponent = withHistory(<FavoritesScreen />);

    render(preparedComponent);
    expect(screen.getByTestId(favoritesContainerTestId)).toBeInTheDocument();
  });
});
