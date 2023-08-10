import { Helmet } from 'react-helmet-async';
import PlaceCard from '../../components/place-card/place-card';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { Review } from '../../types/reviews';
import { useParams } from 'react-router-dom';
import { fetchOfferByIdAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
//import NotFoundScreen from '../not-found-screen/not-found-screen';

type OfferScreenProps = {
  offers: Offer[];
  reviews: Review[];
}

function OfferScreen(props: OfferScreenProps):JSX.Element {
  const {offers, reviews} = props;
  const neighbourhoods = offers.slice(0,3);

  const {id} = useParams();
  const dispatch = useDispatch();
  const offer = useAppSelector((state) => state.offer);
  console.log(offer);
  const fetchingStatus = useAppSelector((state) => state.offerFetchingStatus);

  useEffect(() => {

    if (id) {
      console.log(1)
      dispatch(fetchOfferByIdAction(id));
    }

    // return () => {
    //   dispatch(dropOffer());
    // };
  }, [id, dispatch]);

  const {images, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;
  console.log(offer)
  return (
    <div className="page">
      <Helmet>
        <title>Шесть городов. {title}</title>
      </Helmet>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
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
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{
                    width: '80%'
                  }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
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
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  {description.split('.').map((item) => <p key={item.slice(0,10)} className="offer__text">{item}</p>)}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map offers={neighbourhoods} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {neighbourhoods.map((offerI) => <PlaceCard key={offerI.id} offer={offerI}/>)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
