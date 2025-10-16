import React, {ChangeEvent, useState} from 'react';
import {ReviewFormSettings} from '../../const.ts';
import Rating from './rating.tsx';

function ReviewForm() {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });
  const isDisabled = formData.comment.length > ReviewFormSettings.MaxLength
    || formData.comment.length < ReviewFormSettings.MinLength
    || formData.rating === 0;
  function handleRatingChange(ratingValue: number) {
    setFormData({...formData, rating: ratingValue});
  }
  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    if (value.length <= ReviewFormSettings.MaxLength) {
      setFormData({...formData, comment: event.target.value});
    }
  }
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormData({rating: 0, comment: ''});
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating rating={formData.rating} onChange={handleRatingChange}></Rating>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{ReviewFormSettings.MinLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
          onSubmit={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
