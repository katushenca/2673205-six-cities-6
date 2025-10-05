import MainPage from '../../pages/main-page/main-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NonFoundPage from '../../pages/non-found-page/non-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {HelmetProvider} from 'react-helmet-async';

type AppProps = {
  cardsCount : number;
}

function App({cardsCount} : AppProps) : JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage cardsCount={cardsCount} />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Unknown}
            element={<NonFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
