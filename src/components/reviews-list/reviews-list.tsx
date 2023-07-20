import ReviewCard from '../review/review-card';
import { Review } from '../../types/reviews';

type ReviewsListProps = {
    reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      <ReviewCard reviews={reviews} />
    </ul>
  );
}

export default ReviewsList;
