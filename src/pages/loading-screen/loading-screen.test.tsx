import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loading Screen', () => {
  it('should render correct', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
