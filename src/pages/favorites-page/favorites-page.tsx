import PageTitle from '@PageTitle/page-title.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoritesAction} from '../../store/actions/api-actions.ts';
import HeaderMemo from '@Header/header.tsx';
import OffersListMemo from '@OffersList/offers-list.tsx';
import FooterMemo from '../../components/footer/footer.tsx';
import {selectFavoritesGroupedByCity} from '../../store/selectors/selectors.ts';

type FavoritesPageProps = {
  isFavoritePage: boolean;
}

function FavoritesPage({isFavoritePage}: FavoritesPageProps) : JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchFavoritesAction);
  const offersByCity = useAppSelector(selectFavoritesGroupedByCity);

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
