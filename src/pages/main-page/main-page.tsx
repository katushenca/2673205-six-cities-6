import PageTitle from '@PageTitle/page-title.tsx';
import Map from '@Map/map.tsx';
import {useCallback, useMemo, useState} from 'react';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {useAppSelector} from '../../hooks';
import HeaderMemo from '@Header/header.tsx';
import OffersListMemo from '@OffersList/offers-list.tsx';
import {selectCurrentCity, selectFilteredOffers, selectOffers} from '../../store/selectors/selectors.ts';

type MainPageProps = {
  isFavoritePage: boolean;
}
function MainPage({isFavoritePage} : MainPageProps) : JSX.Element {
  const [currentHoveredOfferId, setCurrentHoveredOfferId] = useState<string | null>(null);
  const offers = useAppSelector(selectOffers);
  const setCurrentOfferId = useCallback((id: string | null) => setCurrentHoveredOfferId(id), []);
  const currentCity = useAppSelector(selectCurrentCity);
  const filteredOffers = useAppSelector(selectFilteredOffers);
  const currentOffer = useMemo(() => offers.find((offer) => offer.id === currentHoveredOfferId) ?? undefined, [offers, currentHoveredOfferId]);

  return (
    <PageTitle>
      <div className="page page--gray page--main">
        <HeaderMemo />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList />
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {currentCity.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
              Popular
                    <svg className="places__sorting-arrow" width={7} height={4}>
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex={0}
                    >
                    Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                    Top rated first
                    </li>
                  </ul>
                </form>
                <OffersListMemo offers={filteredOffers} isFavoritePage={isFavoritePage} setCurrentOfferId={setCurrentOfferId}/>
              </section>
              <div className="cities__right-section">
                <Map city={currentCity} currentOffer={currentOffer} allOffers={filteredOffers}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTitle>
  );
}

export default MainPage;

