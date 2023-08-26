import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorScreen from './error-screen';
import { withStore } from '../../utils/mock-component';
import { fetchOffersAction } from '../../store/api-actions';
import { extractActionsTypes } from '../../utils/mock';
import { APIRoute } from '../../const';

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {
    const firstExpectedText = 'Не удалось загрузить';
    const { withStoreComponent } = withStore(<ErrorScreen />, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "fetchOffersAction" when user clicked replay button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorScreen />, {});
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });
});
