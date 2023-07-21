import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { Setting } from './const';
import { offers, offerFullCard } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        placesCount={Setting.PlacesCount}
        offers={offers}
        offerFullCard={offerFullCard}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
