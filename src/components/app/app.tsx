import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import Layout from '../layout/layout';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-rout';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-rout';
import browserHistory from '../../browser-history';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { getOffers, getOffersDataLoadingStatus, getErrorStatus } from '../../store/offers-process/offers-process.selector';
import ErrorScreen from '../../pages/error-screen/error-screen';

type AppProps = {
  cities: string[];
};

function App(props: AppProps): JSX.Element {
  const {cities} = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);
  const offers = useAppSelector(getOffers);

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return (<ErrorScreen />);
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout authorizationStatus={authorizationStatus} />}>
            <Route
              index element={
                <WelcomeScreen
                  offers={offers}
                  cities={cities}
                />
              }
            />
            <Route element={<PrivateRoute authorizationStatus={authorizationStatus} />}>
              <Route
                element={<FavoritesScreen />}
                path={AppRoute.Favorites}
              />
            </Route>
            <Route
              path={`${AppRoute.Offer}:id`}
              element={<OfferScreen />}
            />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
          <Route path={AppRoute.Login} element={<LoginScreen />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
