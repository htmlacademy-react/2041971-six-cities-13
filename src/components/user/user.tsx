import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { fetchFavoritesAction, logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserEmail } from '../../services/user';
import { getFavoritesCount } from '../../store/favorite-process/favorite-process.selector';

function User(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(getFavoritesCount);
  const userEmail = useAppSelector(getUserEmail);

  const handleFavoriteClick = () => dispatch(fetchFavoritesAction());

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
            onClick={() => handleFavoriteClick}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className="header__favorite-count">{favoritesCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to={AppRoute.Login}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default User;
