import React, {ChangeEvent, useState} from 'react';
import {ReviewFormSettings} from '../../const.ts';
import Rating from '@ReviewForm/rating.tsx';
import {useAppDispatch} from '../../hooks';
import {useParams} from 'react-router-dom';
import {postCommentAction} from '../../store/actions/api-actions.ts';

function ReviewForm() {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });
  const dispatch = useAppDispatch();
  const {id} = useParams();

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDisabled = isSending
    || formData.comment.length > ReviewFormSettings.MaxLength
    || formData.comment.length < ReviewFormSettings.MinLength
    || formData.rating === 0;
  function handleRatingChange(ratingValue: number) {
    if (isSending) {
      return;
    }
    setFormData({...formData, rating: ratingValue});
  }

  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (isSending) {
      return;
    }
    const value = event.target.value;
    if (value.length <= ReviewFormSettings.MaxLength) {
      setFormData({...formData, comment: value});
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!id || isDisabled) {
      return;
    }

    const send = async () => {
      setIsSending(true);
      setErrorMessage(null);

      try {
        await dispatch(
          postCommentAction({
            offerId: id,
            commentData: {
              comment: formData.comment,
              rating: formData.rating
            }
          })
        ).unwrap();

        setFormData({rating: 0, comment: ''});
      } catch {
        setErrorMessage('Could not send your review. Please try again.');
      } finally {
        setIsSending(false);
      }
    };

    void send();
  }


  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Rating rating={formData.rating} onChange={handleRatingChange} disabled={isSending} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentChange}
        disabled={isSending}
        minLength={ReviewFormSettings.MinLength}
        maxLength={ReviewFormSettings.MaxLength}
      />

      {errorMessage && (
        <p className="reviews__error" style={{color: 'red'}}>
          {errorMessage}
        </p>
      )}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">{ReviewFormSettings.MinLength} characters</b>.
        </p>

        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
