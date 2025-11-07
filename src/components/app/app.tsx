import MainPage from '@MainPage/main-page.tsx';
import LoginPage from '@LoginPage/login-page.tsx';
import OfferPage from '@OfferPage//offer-page.tsx';
import NonFoundPage from '@NonFoundPage/non-found-page.tsx';
import PrivateRoute from '@PrivateRoute/private-route.tsx';
import FavoritesPage from '@FavoritePage/favorites-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {HelmetProvider} from 'react-helmet-async';
import {OfferInfo} from '../../types/offerInfo.ts';

type AppProps = {
  offers: OfferInfo[];
}

function App({offers} : AppProps) : JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offers={offers} isFavoritePage={false}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage offers={offers} authStatus={AuthorizationStatus.Auth}/>} // временно, чтобы проверить работу компонента комментария
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth} //временно, чтобы проверить работу страницы
              >
                <FavoritesPage offers={offers} isFavoritePage/>
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
