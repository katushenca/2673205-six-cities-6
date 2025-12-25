import React from 'react';
import {RatingOptions} from '../../const';

type RatingProps = {
  rating: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function Rating({rating, onChange, disabled = false}: RatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {RatingOptions.map((option) => (
        <React.Fragment key={option.value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            type="radio"
            id={`${option.value}-stars`}
            value={option.value}
            checked={rating === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
          />
          <label
            htmlFor={`${option.value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={option.title}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
}
