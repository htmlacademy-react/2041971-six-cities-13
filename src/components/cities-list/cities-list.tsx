import { changeCity } from '../../store/action';
import { useAppDispatch } from '../../hooks';

function CitiesList(cities: string[]): JSX.Element {
  const dispatch = useAppDispatch();

  return(
    <ul className="locations__list tabs__list">
      {cities && cities.map((city) => (
        <li
          key={city}
          className="locations__item"
          onClick={() => {
            dispatch(changeCity());
          }}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{city}</span>
          </a>
        </li>))}
    </ul>
  );
}

export default CitiesList;
