import {useNavigate, useParams} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import ReviewForm from '@ReviewForm/review-form.tsx';
import PageTitle from '@PageTitle/page-title.tsx';
import {fetchNearbyOffersAction, fetchOfferAction, updateFavoriteAction} from '../../store/actions/api-actions.ts';
import {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import HeaderMemo from '@Header/header.tsx';
import {
  makeSelectIsFavoriteOffer, selectAuthStatus,
  selectIsLoading, selectNearbyOffers,
  selectOffer, selectOfferNotFound
} from '../../store/selectors/selectors.ts';
import {fetchCommentsAction} from '../../store/actions/api-actions';
import {selectComments} from '../../store/selectors/selectors';
import ReviewsList from '../../components/reviews/reviews-list.tsx';
import OffersListMemo from '@OffersList/offers-list.tsx';
import Map from '../../components/map/map.tsx';
import ServerError from '../../components/server-error/server-error.tsx';


function OfferPage() : JSX.Element {
  const navigate = useNavigate();
  const {id} = useParams();

  const offer = useAppSelector(selectOffer);
  const comments = useAppSelector(selectComments);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const nearby3 = nearbyOffers.slice(0, 3);

  const selectIsFavorite = useMemo(makeSelectIsFavoriteOffer, []);
  const isFavoriteOffer = useAppSelector((state) => selectIsFavorite(state, id));
  const isLoading = useAppSelector(selectIsLoading);
  const isAuth = useAppSelector(selectAuthStatus) === AuthorizationStatus.Auth;
  const dispatch = useAppDispatch();
  const handleToggleBookmark = () => {

    if (offer) {
      dispatch(updateFavoriteAction({
        offerId: offer.id,
        isFavorite: !isFavoriteOffer
      }));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }
    return () => {
    };
  }, [dispatch, id]);

  const offerNotFound = useAppSelector(selectOfferNotFound);

  useEffect(() => {
    if (offerNotFound) {
      navigate(AppRoute.Unknown);
    }
  }, [offerNotFound, navigate]);

  if (isLoading) {
    return <div>Loading offer...</div>;
  }

  if (!offer) {
    return <div>No offer found</div>;
  }
  const starsPercent = (Math.round(offer.rating) / 5) * 100;
  return (
    <PageTitle>
      <div className="page">
        <HeaderMemo />
        <ServerError />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer?.images.slice(0, 6).map((src, index) => (
                  <div key={src} className="offer__image-wrapper">
                    <img
                      className="offer__image"
                      src={src}
                      alt={`Фото ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer?.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer?.title}
                  </h1>
                  <button
                    className={`offer__bookmark-button button${isFavoriteOffer ? ' offer__bookmark-button--active' : ''}`}
                    type="button"
                    onClick={isAuth ? handleToggleBookmark : () => {
                      navigate(AppRoute.Login);
                    }}
                  >
                    <svg className="offer__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">{isFavoriteOffer ? 'In' : 'To'} bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${starsPercent}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer?.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{offer?.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} {offer.maxAdults === 1 ? 'adult' : 'adults'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer?.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer?.goods.map((src) =>(
                      <li key={src} className="offer__inside-item">{src}</li>)
                    )}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                      <img
                        className="offer__avatar user__avatar"
                        src={offer?.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer?.host.name}</span>
                    <span className="offer__user-status">{offer?.host.isPro ? 'Pro' : ''}</span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer?.description}
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <ReviewsList reviews={comments} />
                  {isAuth && <ReviewForm />}
                </section>
              </div>
            </div>
            <Map
              city={offer.city}
              currentOffer={offer}
              allOffers={[offer, ...nearby3]}
              className="offer__map map"
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <OffersListMemo
                offers={nearby3}
                isFavoritePage={false}
                listClassName="near-places__list places__list"
                cardPage="near-places"
              />
            </section>
          </div>
        </main>
      </div>
    </PageTitle>
  );
}

export default OfferPage;
