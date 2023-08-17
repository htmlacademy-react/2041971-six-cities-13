import {useAppDispatch} from '../../hooks';
import {fetchOffersAction} from '../../store/api-actions';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="page__favorites-container container">
      <section className="favorites favorites--empty">
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Не удалось загрузить</b>
          <button className="reviews__submit form__submit button"
            type="button"
            onClick={() => {
              dispatch(fetchOffersAction());
            }}
          >Попробовать ещё раз
          </button>
        </div>
      </section>
    </div>
  );
}

export default ErrorScreen;
