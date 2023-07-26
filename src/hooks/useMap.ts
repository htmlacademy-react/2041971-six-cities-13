import { useEffect, useState, useRef, MutableRefObject } from 'react';
import leaflet from 'leaflet';
import { Map } from 'leaflet';
import { Location } from '../types/offer';

type MapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  cityLocation: Location;
}

function useMap({mapRef, cityLocation}: MapProps) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude,
        },
        zoom: cityLocation.zoom,
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, cityLocation]);

  return map;
}

export default useMap;
