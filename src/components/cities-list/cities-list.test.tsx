import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { withHistory, withStore } from '../../utils/mock-component';
import CitiesList from './cities-list';
import { makeFakeCities } from '../../utils/mock';

describe('Component: Cities List', () => {
  it('should render correctly', () => {
    const citiesListTestId = 'cities list';
    const citiesItemTestId = 'cities item';
    const { withStoreComponent } = withStore(<CitiesList />, {});

    render(withStoreComponent);

    expect(screen.getAllByTestId(citiesListTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(citiesItemTestId).length).toBe(makeFakeCities().length);
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