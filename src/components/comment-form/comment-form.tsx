import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormEvent } from 'react';
import { fetchSendCommentAction } from '../../store/api-actions';
import { getCommentDataSendingStatus, getCommentSendingErrorStatus} from '../../store/offer-id-process/offer-id-process.selector';
import ErrorCommentsScreen from '../../pages/error-screen/error-comments-screen';
import { useState, ChangeEvent } from 'react';
import { isReviewFormValid } from '../../utils/utils';

type CommentFormProps = {
  id: string;
}

function CommentForm({id}: CommentFormProps): JSX.Element {
  const hasError = useAppSelector(getCommentSendingErrorStatus);
  const isCommentSending = useAppSelector(getCommentDataSendingStatus);

  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState({
    ratingData: 0,
    comment: '',
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    let parsedValue: string | number = value;

    if (name === 'ratingData') {
      parsedValue = Number(value);
    }

    setFormState({...formState, [name]: parsedValue});
  };

  const isDisabled = isCommentSending || !isReviewFormValid(formState.ratingData, formState.comment);


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const rating = Number(formState.ratingData);
    const comment = formState.comment;

    if (rating !== null && comment !== null) {
      dispatch(fetchSendCommentAction({rating, comment, id, cb: () => {
        setFormState({
          ratingData: 0,
          comment: '',
        });
      }}));
    }
  };

  return (
    <form className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden"
          name="ratingData"
          value="5"
          checked={formState.ratingData === 5}
          id="5-stars"
          type="radio"
          required
          disabled={isCommentSending}
          onChange={handleFieldChange}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="ratingData"
          value="4"
          checked={formState.ratingData === 4}
          id="4-stars"
          type="radio"
          disabled={isCommentSending}
          onChange={handleFieldChange}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="ratingData"
          value="3"
          checked={formState.ratingData === 3}
          id="3-stars"
          type="radio"
          disabled={isCommentSending}
          onChange={handleFieldChange}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="ratingData"
          value="2"
          checked={formState.ratingData === 2}
          id="2-stars"
          type="radio"
          disabled={isCommentSending}
          onChange={handleFieldChange}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="ratingData"
          value="1"
          checked={formState.ratingData === 1}
          id="1-star"
          type="radio"
          disabled={isCommentSending}
          onChange={handleFieldChange}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.comment}
        minLength={50}
        disabled={isCommentSending}
        onChange={handleFieldChange}
      >
      </textarea>
      {hasError && <ErrorCommentsScreen />}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >Submit
        </button>
      </div>
    </form>
  );
}


export default CommentForm;
