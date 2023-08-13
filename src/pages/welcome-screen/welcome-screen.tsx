import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities-list/cities-list';
import WelcomeScreenEmpty from '../../components/welcome-screen-empty/welcome-screen-empty';
import { Offer } from '../../types/offer';
import { CITIES } from '../../const';
import { sorting } from '../../utils';
import MainDisplay from '../../components/main-display/main-display';

type WelcomeScreenProps = {
    offers: Offer[];
    cities: typeof CITIES;
}

function WelcomeScreen({offers, cities}: WelcomeScreenProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const sortingType = useAppSelector((state) => state.sortingType);
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
            <CitiesList cities={cities} />
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
