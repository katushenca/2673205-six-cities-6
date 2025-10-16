import {OfferCard} from '../../types/offerCard.ts';
import OffersCard from '@OffersCard/offers-card.tsx';
import React from 'react';

type OfferCardProps = {
  offers: OfferCard[];
  isFavoritePage: boolean;
}

function OffersList({offers, isFavoritePage}: OfferCardProps) : JSX.Element {
  const [, setActiveOfferId] = React.useState<string | null>(null);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OffersCard
          offerCard={offer}
          key={offer.id}
          onHover={setActiveOfferId} onLeave={() => setActiveOfferId(null)}
          isFavoritePage={isFavoritePage}
        />
      ))}
    </div>);
}

export default OffersList;
