import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectServerError} from '../../store/selectors/selectors';
import {clearServerError} from '../../store/slices/server-app-slice.ts';

function ServerError(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const serverError = useAppSelector(selectServerError);

  if (!serverError) {
    return null;
  }

  return (
    <div style={{padding: 12, background: '#ffe6e6', margin: '10px 0'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', gap: 12}}>
        <span>{serverError}</span>
        <button type="button" onClick={() => dispatch(clearServerError())}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default ServerError;
