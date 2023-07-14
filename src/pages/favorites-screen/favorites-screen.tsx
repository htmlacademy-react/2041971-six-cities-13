import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import Logo from '../../components/logo/logo';
import User from '../../components/user/user';
import Sign from '../../components/sign/sign';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

type FavoritesScreenProps = {
  offers: Offer[];
};

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favorites = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Helmet>
        <title>Шесть городов. Выбранные места</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <User />
                <Sign />
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
