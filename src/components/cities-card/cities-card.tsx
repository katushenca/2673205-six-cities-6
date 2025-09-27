type CitiesCardProps = {
  isPremium: boolean;
  url: string;
  imageSrc: string;
  priceValue: number;
  isBookmark: boolean;
  rating: number;
  cardName: string;
  cardType: string;
}

function CitiesCard({
  isPremium,
  url,
  imageSrc,
  priceValue,
  isBookmark,
  rating,
  cardName,
  cardType} : CitiesCardProps) : JSX.Element {
  const percent = Math.min(100, Math.max(0, (rating / 5) * 100));
  return (
    <article className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href={url}>
          <img
            className="place-card__image"
            src={imageSrc}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{priceValue}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isBookmark ? 'place-card__bookmark-button--active' : null} button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{isBookmark ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${percent}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">
            {cardName}
          </a>
        </h2>
        <p className="place-card__type">{cardType}</p>
      </div>
    </article>
  );
}

export default CitiesCard;
