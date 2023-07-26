type CitiesListProps = {
  cities: string[];
  onCity: (city: string) => void;
}

function CitiesList({cities, onCity}: CitiesListProps): JSX.Element {
  return(
    <ul className="locations__list tabs__list">
      {cities && cities.map((city) => (
        <li
          key={city}
          className="locations__item"
          onClick={() => onCity(city)}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{city}</span>
          </a>
        </li>))}
    </ul>
  );
}

export default CitiesList;
