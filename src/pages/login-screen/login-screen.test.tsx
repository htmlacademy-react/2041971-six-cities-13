import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { withHistory, withStore } from '../../utils/mock-component';
import LoginScreen from './login-screen';

describe('Component: Login Screen', () => {
  it('should render correctly', () => {
    const signinText = 'Sign in';
    const loginText = 'E-mail';
    const passwordText = 'Password';
    const {withStoreComponent} = withStore(<LoginScreen />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(signinText)).toBeInTheDocument();
    // expect(screen.getByText(loginText)).toBeInTheDocument();
    // expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async() => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks@mail.ru';
    const expectedPasswordValue = 'keks1';
    const {withStoreComponent} = withStore(<LoginScreen />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );
    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});

