import MainPage from '@MainPage/main-page.tsx';
import LoginPage from '@LoginPage/login-page.tsx';
import OfferPage from '@OfferPage//offer-page.tsx';
import NonFoundPage from '@NonFoundPage/non-found-page.tsx';
import PrivateRoute from '@PrivateRoute/private-route.tsx';
import FavoritesPage from '@FavoritePage/favorites-page.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {HelmetProvider} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Spinner} from '../spinner/spinner.tsx';
import {checkAuthAction} from '../../store/actions/api-actions.ts';
import {useEffect} from 'react';

function App() : JSX.Element {
  const isOffersLoading = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);
  const isAuth = useAppSelector((state) => state.authStatus);
  if (isOffersLoading) {
    return (
      <Spinner size={50} color={'#083d5e'}/>
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage isFavoritePage={false}/>}
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
                authorizationStatus={isAuth}
              >
                <FavoritesPage isFavoritePage/>
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
