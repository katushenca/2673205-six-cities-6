import {OfferCard} from '../../types/offerCard.ts';
import OffersCard from '@OffersCard/offers-card.tsx';
import {memo} from 'react';

type OfferCardProps = {
  offers: OfferCard[];
  isFavoritePage: boolean;
  setCurrentOfferId?: (id: string | null) => void;
  listClassName?: string;
  cardPage?: 'cities' | 'favorites' | 'near-places';
}

function OffersList({offers, isFavoritePage, setCurrentOfferId, listClassName, cardPage}: OfferCardProps) : JSX.Element {

  const handleHover = (id: string) => {
    if (setCurrentOfferId) {
      setCurrentOfferId(id);
    }
  };

  const handleLeave = () => {
    if (setCurrentOfferId) {
      setCurrentOfferId(null);
    }
  };

  return (
    <div className={listClassName ?? 'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OffersCard
          offerCard={offer}
          key={offer.id}
          onHover={handleHover}
          onLeave={handleLeave}
          isFavoritePage={isFavoritePage}
          cardPageName={cardPage}
        />
      ))}
    </div>
  );
}

const OffersListMemo = memo(OffersList);
OffersListMemo.displayName = 'OffersList';
export default OffersListMemo;
