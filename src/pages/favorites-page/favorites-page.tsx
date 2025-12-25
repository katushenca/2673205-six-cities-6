import PageTitle from '@PageTitle/page-title.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoritesAction} from '../../store/actions/api-actions.ts';
import HeaderMemo from '@Header/header.tsx';
import OffersListMemo from '@OffersList/offers-list.tsx';
import FooterMemo from '../../components/footer/footer.tsx';
import {selectFavoritesGroupedByCity} from '../../store/selectors/selectors.ts';
import {useMemo} from 'react';
import ServerError from '../../components/server-error/server-error.tsx';

type FavoritesPageProps = {
  isFavoritePage: boolean;
}

function FavoritesPage({isFavoritePage}: FavoritesPageProps) : JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchFavoritesAction);
  const offersByCity = useAppSelector(selectFavoritesGroupedByCity);
  const isEmpty = useMemo(() => {
    const total = Object.values(offersByCity).reduce((sum, arr) => sum + arr.length, 0);
    return total === 0;
  }, [offersByCity]);

  return (
    <PageTitle>
      <div className="page">
        <HeaderMemo />
        <ServerError />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {isEmpty ? (
              <section className="favorites favorites--empty">
                <h1 className="favorites__title">Saved listing</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future trips.
                  </p>
                </div>
              </section>
            ) : (
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
                        <OffersListMemo offers={cityOffers} isFavoritePage={isFavoritePage} />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </main>
        <FooterMemo />
      </div>
    </PageTitle>
  );
}

export default FavoritesPage;
