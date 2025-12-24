import leaflet, {layerGroup, Marker} from 'leaflet';
import {City} from '../../types/city';
import {OfferInfo} from '../../types/offerInfo';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';

type MapProps = {
  city: City;
  currentOffer: OfferInfo | undefined;
  allOffers: OfferInfo[];
  className?: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({city, currentOffer, allOffers, className}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      requestAnimationFrame(() => map.invalidateSize());
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      allOffers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(currentOffer && offer.id === currentOffer.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, allOffers, currentOffer]);

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city]);

  return <div className={className ?? 'cities__map map'} ref={mapRef} />;
}

export default Map;
