import {Link} from 'react-router-dom';

function NonFoundPage() : JSX.Element {
  return (
    <div>
      <div>
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NonFoundPage;
