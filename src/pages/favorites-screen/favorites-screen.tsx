import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorite-process/favorite-process.selector';
//import { store } from '../../store';
//import { fetchFavoritesAction } from '../../store/api-actions';

function FavoritesScreen(): JSX.Element {
  //store.dispatch(fetchFavoritesAction());
  const favorites = useAppSelector(getFavorites);

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
