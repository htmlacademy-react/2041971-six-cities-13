import { Icon, Marker, layerGroup } from 'leaflet';
import './map.css';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
    offers: Offer[];
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT as string,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({offers}: MapProps): JSX.Element {
  const points = offers.map((offer) => offer.location);
  const cityLocation = offers[0].city.location;

  const mapRef = useRef(null);
  const map = useMap({mapRef, cityLocation});

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude,
        },
        cityLocation.zoom,
      );
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });
        marker
          .setIcon(defaultCustomIcon)
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]);

  return (
    <div ref={mapRef} ></div>
  );
}

export default Map;
