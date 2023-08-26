import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/offers-process/offers-process.slice';
import { getCity } from '../../store/offers-process/offers-process.selector';
import { CITIES } from '../../const';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCity);

  const handleCityCheck = (city: string) => {
    dispatch(changeCity(city));
  };

  return(
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li
          key={city}
          className="locations__item"
        >
          <a
            className={
              classNames('locations__item-link tabs__item',
                {'tabs__item--active': city === activeCity}
              )
            }
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              handleCityCheck(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>))}
    </ul>
  );
}

export default CitiesList;
