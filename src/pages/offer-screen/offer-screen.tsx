import { Helmet } from 'react-helmet-async';
import PlaceCard from '../../components/place-card/place-card';
import Map from '../../components/map/map';
import { useParams } from 'react-router-dom';
import { fetchNearbyOffersAction, fetchOfferByIdAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
//import LoadingScreen from '../loading-screen/loading-screen';
import OfferDetails from '../../components/offer-details/offer-details';
//import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getOfferById, getNearbyOffers } from '../../store/offer-id-process/offer-id-process.selector';

function OfferScreen():JSX.Element {
  const {id} = useParams();
  const dispatch = useDispatch();
  const offer = useAppSelector(getOfferById);
  const neighbourhoods = useAppSelector(getNearbyOffers).slice(0,3);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }
  }, [id, dispatch]);

  return (
    <div className="page">
      {offer && (
        <>
          <Helmet>
            <title>{`${offer.city.name}. ${offer.title}`}</title>
          </Helmet>
          <main className="page__main page__main--offer">
            <section className="offer">
              <OfferDetails offer={offer} />
              <section className="offer__map map">
                <Map offers={neighbourhoods} selectedOffer={offer}/>
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {neighbourhoods.map((neighbourhood) => <PlaceCard key={neighbourhood.id} offer={neighbourhood} />)}
                </div>
              </section>
            </div>
          </main>
        </>)}
    </div>
  );
}

export default OfferScreen;
