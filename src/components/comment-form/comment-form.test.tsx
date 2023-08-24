import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import CommentForm from './comment-form';

describe('Component: Comment Form', () => {
  it('should render correctly', () => {
    const id = 'hgjgjf';
    const formNameText = 'Your review';
    const reviewsHelpText = 'To submit review please make sure to set';
    const { withStoreComponent } = withStore(<CommentForm id={id} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(formNameText)).toBeInTheDocument();
    expect(screen.getByText(reviewsHelpText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const { withStoreComponent } = withStore(<AuthScreen />, {});
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