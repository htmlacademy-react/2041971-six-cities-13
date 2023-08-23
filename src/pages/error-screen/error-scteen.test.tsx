import { render, screen } from '@testing-library/react';
import ErrorScreen from './error-screen';
import { withHistory } from '../../utils/mock-component';

describe('Component: Error Screen', () => {
  it('should render correct', () => {
    const preparedComponent = withHistory(<ErrorScreen />);

    render(preparedComponent);
    expect(screen.getByText(/Не удалось загрузить/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
  });
});
