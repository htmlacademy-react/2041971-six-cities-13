import { render, screen } from '@testing-library/react';
import ErrorPasswordScreen from './error-password-screen';

describe('Component: Error Password Screen', () => {
  it('should render correct', () => {
    const expectedText = /Пароль должен состоять минимум из одной буквы и цифры/i;
    render(<ErrorPasswordScreen />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
