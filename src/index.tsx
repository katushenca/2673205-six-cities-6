import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {fetchOffersAction} from './store/actions/api-actions.ts';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
