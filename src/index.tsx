import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offers, offerFullCard } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { store } from './store';
import { CITIES } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={offers}
        offerFullCard={offerFullCard}
        reviews={reviews}
        cities={CITIES}
      />
    </Provider>
  </React.StrictMode>
);
