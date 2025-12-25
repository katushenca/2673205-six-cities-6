import PageTitle from '@PageTitle/page-title.tsx';
import Map from '@Map/map.tsx';
import {useCallback, useMemo, useState} from 'react';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {useAppSelector} from '../../hooks';
import HeaderMemo from '@Header/header.tsx';
import OffersListMemo from '@OffersList/offers-list.tsx';
import {selectCurrentCity, selectFilteredOffers, selectOffers} from '../../store/selectors/selectors.ts';
import {sortOffers} from '../../utils/sortOffers.ts';
import {SortType} from '../../types/sortType.ts';
import Sorting from '../../components/sorting/sorting.tsx';
import MainEmpty from '../../components/main-empty/main-empty.tsx';
import ServerError from '../../components/server-error/server-error.tsx';

type MainPageProps = {
  isFavoritePage: boolean;
}
function MainPage({isFavoritePage} : MainPageProps) : JSX.Element {
  const [currentHoveredOfferId, setCurrentHoveredOfferId] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>(SortType.Popular);
  useAppSelector(selectOffers);
  const setCurrentOfferId = useCallback((id: string | null) => setCurrentHoveredOfferId(id), []);
  const currentCity = useAppSelector(selectCurrentCity);
  const filteredOffers = useAppSelector(selectFilteredOffers);
  const isEmpty = filteredOffers.length === 0;
  const sortedOffers = useMemo(
    () => sortOffers(filteredOffers, sortType),
    [filteredOffers, sortType]
  );

  const currentOffer = useMemo(
    () => sortedOffers.find((offer) => offer.id === currentHoveredOfferId) ?? undefined,
    [sortedOffers, currentHoveredOfferId]
  );
  return (
    <PageTitle>
      <div className="page page--gray page--main">
        <HeaderMemo />
        <ServerError />
        <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList />
          </div>
          <div className="cities">
            <div className={`cities__places-container ${isEmpty ? 'cities__places-container--empty' : ''} container`}>
              {isEmpty ? (
                <>
                  <MainEmpty city={currentCity} />
                  <div className="cities__right-section" />
                </>
              ) : (
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">
                      {filteredOffers.length} places to stay in {currentCity.name}
                    </b>
                    <Sorting activeSort={sortType} onChange={setSortType} />
                    <OffersListMemo
                      offers={sortedOffers}
                      isFavoritePage={isFavoritePage}
                      setCurrentOfferId={setCurrentOfferId}
                    />
                  </section>
                  <div className="cities__right-section">
                    <Map city={currentCity} currentOffer={currentOffer} allOffers={sortedOffers} />
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </PageTitle>
  );
}

export default MainPage;

