import { useSelector, useDispatch } from 'react-redux';
import {changeCity} from '../../store/actions/action.ts';
import {CITIES} from '../../mocks/cities.ts';
import {OfferInfo} from '../../types/offerInfo.ts';
import {City} from '../../types/city.ts';

interface RootState {
  offers: OfferInfo[];
  city: City;
}

export const CitiesList = () => {
  const dispatch = useDispatch();

  const currentCityName = useSelector((state: RootState) => state.city.name);

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
                city.name === currentCityName ? 'tabs__item--active' : ''
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
};
