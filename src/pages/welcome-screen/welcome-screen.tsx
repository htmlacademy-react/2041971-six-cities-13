import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getCity, getSortingType } from '../../store/offers-process/offers-process.selector';
import { Offer } from '../../types/offer';
import { sorting } from '../../utils/utils';
import MainDisplay from '../../components/main-display/main-display';
import CitiesList from '../../components/cities-list/cities-list';
import WelcomeScreenEmpty from '../../components/welcome-screen-empty/welcome-screen-empty';

type WelcomeScreenProps = {
    offers: Offer[];
}

function WelcomeScreen({offers}: WelcomeScreenProps): JSX.Element {
  const city = useAppSelector(getCity);
  const sortingType = useAppSelector(getSortingType);
  const currentOffers = sorting[sortingType](offers.filter((offer) => offer.city.name === city));

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Шесть городов. Главная страница</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        {!currentOffers.length
          ? <WelcomeScreenEmpty city={city} />
          : <MainDisplay offers={offers} city={city} currentOffers={currentOffers} />}
      </main>
    </div>
  );
}

export default WelcomeScreen;
