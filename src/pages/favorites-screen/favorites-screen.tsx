import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getErrorStatus, getFavorites } from '../../store/favorite-process/favorite-process.selector';
import ErrorScreen from '../error-screen/error-screen';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const hasError = useAppSelector(getErrorStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Шесть городов. Выбранные места</title>
      </Helmet>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length
            ? <FavoritesList offers={favorites}/>
            : <FavoritesEmpty />}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
