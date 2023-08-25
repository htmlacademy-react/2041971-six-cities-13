import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchChangeStatusFavoriteAction } from '../../store/api-actions';
import { getRatingStarsStyle, getType } from '../../utils/utils';
import FavoriteButton from '../favorite-button/favorite-button';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';

type PlaceCardProps = {
  offer: Offer;
  onCardHover?: (offer?: Offer) => void;
  isNearbyCard?: boolean;
}

function PlaceCard({offer, onCardHover, isNearbyCard}: PlaceCardProps): JSX.Element {
  const {isPremium, previewImage, price, title, type, id, isFavorite, rating} = offer;
  const dispatch = useAppDispatch();
  const status = Number(!isFavorite);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const isOfferFullCard = false;

  const handlerCardHover = (card?: Offer) => {
    if (onCardHover) {
      onCardHover(card);
    }
  };

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return navigate(AppRoute.Login);
    }
    dispatch(fetchChangeStatusFavoriteAction({status, id}));
  };

  return (
    <article className={`${isNearbyCard ? 'near-places' : 'cities'}__card place-card`}
      id={id}
      onMouseEnter={() => handlerCardHover(offer)}
      onMouseLeave={() => handlerCardHover()}
    >
      {isPremium
        ? <div className="place-card__mark"><span>Premium</span></div>
        : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton isFavoriteOffer={isFavorite} onFavoriteClick={handleFavoriteClick} isOfferFullCard={isOfferFullCard} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: getRatingStarsStyle(rating),
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" >
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{getType(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
