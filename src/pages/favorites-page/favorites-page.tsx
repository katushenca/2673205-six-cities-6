import {OfferCard} from '../../types/offerCard.ts';
import PageTitle from '@PageTitle/page-title.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoritesAction} from '../../store/actions/api-actions.ts';
import HeaderMemo from '@Header/header.tsx';
import {useMemo} from 'react';
import OffersListMemo from '@OffersList/offers-list.tsx';
import FooterMemo from '../../components/footer/footer.tsx';

type FavoritesPageProps = {
  isFavoritePage: boolean;
}

function FavoritesPage({isFavoritePage}: FavoritesPageProps) : JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchFavoritesAction);
  const favoriteOffers = useAppSelector((state) => state.favorites);
  const offersByCity = useMemo(() => favoriteOffers.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, OfferCard[]>), [favoriteOffers]);

  return (
    <PageTitle>
      <div className="page">
        <HeaderMemo />
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
                      <OffersListMemo offers={cityOffers} isFavoritePage={isFavoritePage}/>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        <FooterMemo />
      </div>
    </PageTitle>
  );
}

export default FavoritesPage;
