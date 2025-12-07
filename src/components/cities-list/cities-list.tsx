import { useSelector, useDispatch } from 'react-redux';
import {changeCity} from '../../store/slices/offers-slice.ts';
import {CITIES} from '../../const.ts';
import {memo} from 'react';
import {selectCurrentCity} from '../../store/selectors/selectors.ts';
const CitiesList = memo(() => {
  const dispatch = useDispatch();

  const currentCityName = useSelector(selectCurrentCity);

  const handleCityClick = (cityName: string) => {
    const city = CITIES.find((c) => c.name === cityName);
    if (city) {
      dispatch(changeCity(city));
    }
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city.name}>
            <a
              className={`locations__item-link tabs__item ${
                city.name === currentCityName.name ? 'tabs__item--active' : ''
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCityClick(city.name);
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
});

CitiesList.displayName = 'CitiesList';
export { CitiesList };
