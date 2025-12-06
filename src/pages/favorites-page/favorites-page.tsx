import {OfferCard} from '../../types/offerCard.ts';
import OffersList from '@OffersList/offers-list.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import PageTitle from '@PageTitle/page-title.tsx';
import Header from '@Header/header.tsx';
import {useAppSelector} from '../../hooks';

type FavoritesPageProps = {
  isFavoritePage: boolean;
}

function FavoritesPage({isFavoritePage}: FavoritesPageProps) : JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isBookmark);
  const offersByCity = favoriteOffers.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, OfferCard[]>);

  return (
    <PageTitle>
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OffersList offers={cityOffers} isFavoritePage={isFavoritePage}/>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img
              className="footer__logo"
              src="markup/img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </Link>
        </footer>
      </div>
    </PageTitle>
  );
}

export default FavoritesPage;
