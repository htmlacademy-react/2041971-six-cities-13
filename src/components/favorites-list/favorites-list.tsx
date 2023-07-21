import { Offer } from '../../types/offer';
import FavoritesCard from '../favorites-card/favorites-card';

type FavoritesListProps = {
    offers: Offer[];
}

function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((city) =>{
          const offersByCity = offers.filter((offer) => offer.city.name === city);
          return (
            <li key={city} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{city}</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {offersByCity.map((offer) => <FavoritesCard offer={offer} key={offer.id} />)}
              </div>
            </li>
          );
        }
        )}
      </ul>
    </section>
  );
}

export default FavoritesList;
