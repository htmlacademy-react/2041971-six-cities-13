import { Offer } from '../../types/offer';
import { SortingType } from '../../const';

type SortingProps = {
  offers: Offer[];
}

function Sorting({offers}: SortingProps): JSX.Element {
  const handleSortingClick = () => {
    console.log('a');
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
                  Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className="places__options places__options--custom places__options--opened"
        onClick={handleSortingClick}
      >
        {Object.values(SortingType).map((type) => <li key={type} className="places__option places__option--active" tabIndex={0}>{type}</li>)}
      </ul>
    </form>
  );
}

export default Sorting;
