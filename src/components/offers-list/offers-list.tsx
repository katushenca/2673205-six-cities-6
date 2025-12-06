import {OfferCard} from '../../types/offerCard.ts';
import OffersCard from '@OffersCard/offers-card.tsx';
import {memo} from 'react';

type OfferCardProps = {
  offers: OfferCard[];
  isFavoritePage: boolean;
  setCurrentOfferId?: (id: string | null) => void;
}

function OffersList({offers, isFavoritePage, setCurrentOfferId}: OfferCardProps) : JSX.Element {

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
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OffersCard
          offerCard={offer}
          key={offer.id}
          onHover={() => handleHover(offer.id)}
          onLeave={() => handleLeave()}
          isFavoritePage={isFavoritePage}
        />
      ))}
    </div>);
}

const OffersListMemo = memo(OffersList);
OffersListMemo.displayName = 'OffersList';
export default OffersListMemo;
