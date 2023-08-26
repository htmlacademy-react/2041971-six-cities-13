import { OfferCard } from '../../types/offer';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import FavoriteButton from '../favorite-button/favorite-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useEffect } from 'react';
import { fetchCommentsAction } from '../../store/api-actions';
import { getRatingStarsStyle, getType } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { fetchChangeStatusFavoriteAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { getComments } from '../../store/offer-id-process/offer-id-process.selector';
import classNames from 'classnames';

type OfferDetailsProps = {
    offer: OfferCard;
};

function OfferDetails({offer}: OfferDetailsProps): JSX.Element {
  const {id, images, isPremium, title, rating, type, bedrooms, maxAdults, price, host, goods, description, isFavorite} = offer;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getComments);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offerImages = images.slice(0,6);
  const isOfferFullCard = true;
  const status = Number(!isFavorite);

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return navigate(AppRoute.Login);
    }
    dispatch(fetchChangeStatusFavoriteAction({status, id}));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsAction(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offerImages.map((image) => (
            <div key={image} className="offer__image-wrapper">
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && <div className="offer__mark"><span>Premium</span></div>}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{title}</h1>
            <FavoriteButton onFavoriteClick={handleFavoriteClick} isFavoriteOffer={isFavorite} isOfferFullCard={isOfferFullCard} />
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{
                width: getRatingStarsStyle(rating)
              }}
              >
              </span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">{getType(type)}</li>
            <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedroom{bedrooms > 1 && 's'}</li>
            <li className="offer__feature offer__feature--adults">Max {maxAdults} adult{maxAdults > 1 && 's'}</li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((good) => <li key={good} className="offer__inside-item">{good}</li>)}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className={classNames('offer__avatar-wrapper  user__avatar-wrapper' ,{
                'offer__avatar-wrapper--pro' : host.isPro
              })}
              >
                <img className="offer__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt="Host avatar" />
              </div>
              <span className="offer__user-name">{host.name}</span>
              {host.isPro && <span className="offer__user-status">Pro</span>}
            </div>
            <div className="offer__description">
              {description}
            </div>
          </div>
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
            <ReviewsList reviews={reviews} />
            {authorizationStatus === AuthorizationStatus.Auth && <CommentForm id={id} />}
          </section>
        </div>
      </div>
    </>
  );
}

export default OfferDetails;
