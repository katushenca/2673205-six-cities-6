import PageTitle from '@PageTitle/page-title.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FormEvent, useEffect, useMemo, useState} from 'react';
import {AppRoute, AuthorizationStatus, CITIES, PASSWORD_PATTERN} from '../../const.ts';
import {useNavigate} from 'react-router-dom';
import {loginAction} from '../../store/actions/api-actions.ts';
import HeaderMemo from '@Header/header.tsx';
import {selectAuthStatus} from '../../store/selectors/selectors.ts';
import ServerError from '../../components/server-error/server-error.tsx';
import {changeCity} from '../../store/slices/offers-slice.ts';

function LoginPage() : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const passwordHasLetterAndNumber = PASSWORD_PATTERN.test(password);

    if (!email || !password.trim()) {
      setValidationError('Введите email и пароль.');
      return;
    }

    if (!passwordHasLetterAndNumber) {
      setValidationError('Пароль должен содержать хотя бы одну букву и цифру.');
      return;
    }

    setValidationError('');
    dispatch(loginAction({email, password}));
  };

  const errorMessage = useMemo(
    () => validationError || '',
    [validationError]
  );

  const randomCity = useMemo(() => {
    const index = Math.floor(Math.random() * CITIES.length);
    return CITIES[index];
  }, []);

  const handleCityClick = () => {
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Main);
  };

  return (
    <PageTitle>
      <div className="page page--gray page--login">
        <HeaderMemo hideHeaderNav />
        <ServerError />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
                </div>
                {errorMessage && (
                  <p style={{ color: 'red' }}>
                    {errorMessage}
                  </p>
                )}
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <button
                  className="locations__item-link"
                  type="button"
                  onClick={handleCityClick}
                  style={{background: 'none', border: 0, padding: 0, cursor: 'pointer'}}
                >
                  <span>{randomCity.name}</span>
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageTitle>
  );
}

export default LoginPage;
