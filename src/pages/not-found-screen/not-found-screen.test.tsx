import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../utils/mock-component';

describe('Component: Not Found Screen', () => {
  it('should render correct', () => {
    const preparedComponent = withHistory(<NotFoundScreen />);

    render(preparedComponent);
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
