import {Review} from '../../types/review';
import ReviewItem from './review-item';

type Props = {
  reviews: Review[];
};

export default function ReviewsList({reviews}: Props): JSX.Element {
  const sortedLimited = reviews
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {sortedLimited.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
