import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Logo', () => {
  it('should render correct', () => {
    const expectedTextAltText = '6 cities logo';
    const preparedComponent = withHistory(<Logo />);

    render(preparedComponent);
    expect(screen.getByAltText(expectedTextAltText)).toBeInTheDocument();
  });
});
