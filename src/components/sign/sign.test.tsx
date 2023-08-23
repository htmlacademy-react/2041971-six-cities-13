import { render, screen } from '@testing-library/react';
import Sign from './sign';
import { withHistory } from '../../utils/mock-component';

describe('Component: Sign', () => {
  it('should render correct', () => {
    const expectedText = /Sign in/i;
    const preparedComponent = withHistory(<Sign />);

    render(preparedComponent);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
