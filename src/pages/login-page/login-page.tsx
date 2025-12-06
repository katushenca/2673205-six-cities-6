import PageTitle from '@PageTitle/page-title.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FormEvent, useEffect, useMemo, useState} from 'react';
import {AppRoute, AuthorizationStatus, PASSWORD_PATTERN} from '../../const.ts';
import {useNavigate} from 'react-router-dom';
import {loginAction} from '../../store/actions/api-actions.ts';
import HeaderMemo from '@Header/header.tsx';

function LoginPage() : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authStatus);
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

  return (
    <PageTitle>
      <div className="page page--gray page--login">
        <HeaderMemo hideHeaderNav />

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
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageTitle>
  );
}

export default LoginPage;
