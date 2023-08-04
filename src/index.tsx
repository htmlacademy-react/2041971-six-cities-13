import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offerFullCard } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { store } from './store';
import { CITIES } from './const';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        offerFullCard={offerFullCard}
        reviews={reviews}
        cities={CITIES}
      />
    </Provider>
  </React.StrictMode>
);
