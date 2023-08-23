import { render, screen } from '@testing-library/react';
import FavoriteButton from './favorite-button';

describe('Component: Favorite Button', () => {
  it('should render correct', () => {
    const expectedText = /To bookmarks/i;
    render(<FavoriteButton />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
