import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/actions/api-actions.ts';

type HeaderProps = {
  hideHeaderNav?: boolean;
}
function Header({ hideHeaderNav }: HeaderProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const authStatus = useAppSelector((state) => state.authStatus);
  const authData = useAppSelector((state) => state.authUser);
  const favoritesCount = useAppSelector((state) => state.favorites).length;
  const isAuth = authStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img
                className="header__logo"
                src="markup/img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {
            hideHeaderNav ||
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth ?
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {authData?.email}
                        </span>
                        <span className="header__favorite-count">{favoritesCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" onClick={handleLogout} to={AppRoute.Main}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                  : (
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  )}
              </ul>
            </nav>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
