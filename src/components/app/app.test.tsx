import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import App from './app';
import { makeFakeStore } from '../../utils/mock';
import { AppRoute, AuthorizationStatus } from '../../const';
import { render, screen} from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/cities/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth }
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  //   it('should render "OfferScreen" when user navigate to /offer/id', () => {
  //     const withHistoryComponent = withHistory(<App />, mockHistory);
  //     const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
  //     const id = 'hfuhfru';
  //     mockHistory.push(AppRoute.Offer, {id});

  //     render(withStoreComponent);

  //     expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  //   });
});
