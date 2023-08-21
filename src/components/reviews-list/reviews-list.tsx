import ReviewCard from '../review-card/review-card';
import { useAppSelector } from '../../hooks';
import { getCommentsDataLoadingStatus, getCommentsLoadingErrorStatus } from '../../store/offer-id-process/offer-id-process.selector';
import { Review } from '../../types/reviews';
import { sortByDate } from '../../utils/utils';

import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ErrorCommentsScreen from '../../pages/error-screen/error-comments-screen';

type ReviewsListProps = {
    reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const isCommentsDataLoading = useAppSelector(getCommentsDataLoadingStatus);
  const hasCommentsLoadingError = useAppSelector(getCommentsLoadingErrorStatus);

  const currentReviews = [...reviews].sort(sortByDate).slice(0,10);

  if (isCommentsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasCommentsLoadingError) {

    return (
      <ErrorCommentsScreen />
    );
  }

  return (
    <ul className="reviews__list">
      {currentReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
