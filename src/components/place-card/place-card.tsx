import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchChangeStatusFavoriteAction } from '../../store/api-actions';
import { useState } from 'react';
import { getRatingStarsStyle } from '../../utils';
import FavoriteButton from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: Offer;
  onCardHover?: (offer?: Offer) => void;
}

function PlaceCard({offer, onCardHover}: PlaceCardProps): JSX.Element {
  const {isPremium, previewImage, price, title, type, id, isFavorite, rating} = offer;
  const dispatch = useAppDispatch();
  const [isFavoriteOffer, setFavoriteOffer] = useState<boolean>(isFavorite);
  const status = Number(!isFavoriteOffer);
  const authorizationStatus = useAppSelector((store) => store.authorizationStatus);
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
    setFavoriteOffer((prevState) => !prevState);
    dispatch(fetchChangeStatusFavoriteAction({status, id}));
  };

  return (
    <article className="cities__card place-card"
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
          <FavoriteButton isFavoriteOffer={isFavoriteOffer} onFavoriteClick={handleFavoriteClick} isOfferFullCard={isOfferFullCard} />
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
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
