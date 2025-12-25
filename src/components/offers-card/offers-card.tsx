import {OfferCard} from '../../types/offerCard.ts';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {updateFavoriteAction} from '../../store/actions/api-actions.ts';
import {selectAuthStatus, selectFavorites} from '../../store/selectors/selectors.ts';

type OfferCardProps = {
  offerCard : OfferCard;
  onHover: (id: string) => void;
  onLeave: () => void;
  isFavoritePage: boolean;
  cardPageName?: 'cities' | 'favorites' | 'near-places';
}

function OffersCard({offerCard, onHover, onLeave, isFavoritePage, cardPageName}: OfferCardProps) : JSX.Element {
  const navigate = useNavigate();
  const favorites = useAppSelector(selectFavorites);
  const isFavoriteOffer = favorites.some((favorite) => favorite.id === offerCard.id);
  const isAuth = useAppSelector(selectAuthStatus) === AuthorizationStatus.Auth;
  const dispatch = useAppDispatch();
  const handleToggleBookmark = () => {

    if (offerCard) {
      dispatch(updateFavoriteAction({
        offerId: offerCard.id,
        isFavorite: !isFavoriteOffer
      }));
    }
  };
  const percent = Math.min(100, Math.max(0, (offerCard.rating / 5) * 100));
  const cardPage = cardPageName ?? (isFavoritePage ? 'favorites' : 'cities');
  const imageSize =
    cardPage === 'favorites'
      ? {width: 150, height: 110}
      : {width: 260, height: 200};
  return (
    <article className={`${cardPage}__card place-card`}
      onMouseEnter={() => onHover(offerCard.id)}
      onMouseLeave={() => onLeave()}
    >
      {offerCard.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardPage}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offerCard.id}`}>
          <img
            className="place-card__image"
            src={offerCard.previewImage}
            {...imageSize}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offerCard.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavoriteOffer ? 'place-card__bookmark-button--active' : null} button`}
            type="button"
            onClick={isAuth ? handleToggleBookmark : () => {
              navigate(AppRoute.Login);
            }}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{isFavoriteOffer ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${percent}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offerCard.id}`}>
            {offerCard.title}
          </Link>
        </h2>
        <p className="place-card__type">{offerCard.type}</p>
      </div>
    </article>
  );
}

export default OffersCard;
