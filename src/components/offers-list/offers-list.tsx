import {OfferCard} from '../../types/offerCard.ts';
import OffersCard from '@OffersCard/offers-card.tsx';
import React from 'react';

type OfferCardProps = {
  offers: OfferCard[];
  isFavoritePage: boolean;
  setCurrentOfferId?: (id: string | null) => void;
}

function OffersList({offers, isFavoritePage, setCurrentOfferId}: OfferCardProps) : JSX.Element {
  const [, setActiveOfferId] = React.useState<string | null>(null);

  const handleHover = (id: string) => {
    setActiveOfferId(id);
    if (setCurrentOfferId) {
      setCurrentOfferId(id);
    }
  };

  const handleLeave = () => {
    setActiveOfferId(null);
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

export default OffersList;
