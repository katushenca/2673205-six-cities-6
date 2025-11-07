import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import PageTitle from '@PageTitle/page-title.tsx';

function NonFoundPage() : JSX.Element {
  return (
    <PageTitle>
      <div>
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
    </PageTitle>
  );
}

export default NonFoundPage;
