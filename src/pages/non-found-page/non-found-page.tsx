import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const.ts';

function NonFoundPage() : JSX.Element {
  return (
    <div>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div>
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to={AppRoute.Main}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NonFoundPage;
