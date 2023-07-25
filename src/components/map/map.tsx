import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
    offers: Offer[];
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({offers}: MapProps): JSX.Element {
  const [firstOffer] = offers;

  const mapPoints = {
    city: firstOffer.city,
    points: offers.map((offer) => offer.city.location),
  };

  const city = mapPoints.city;
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

  useEffect(() => {
    if (map) {
      mapPoints.points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, mapPoints.points]);

  return (
    <div style={{height: '100%'}} ref={mapRef}></div>
  );
}

export default Map;
