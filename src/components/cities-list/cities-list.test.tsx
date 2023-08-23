import { render, screen } from '@testing-library/react';
import CitiesList from './cities-list';

describe('Component: Cities List', () => {
  it('should render correct', () => {
    render(<CitiesList />);

  });
});
