import classNames from 'classnames';

type FavoriteButtonProps = {
  isFavoriteOffer: boolean;
  onFavoriteClick: () => void;
  isOfferFullCard: boolean;
}

function FavoriteButton({isFavoriteOffer, onFavoriteClick, isOfferFullCard}: FavoriteButtonProps):JSX.Element {
  return (
    <button
      className={
        classNames(`${isOfferFullCard ? 'offer' : 'place-card'}__bookmark-button button`,
          {'place-card__bookmark-button--active': isFavoriteOffer && !isOfferFullCard},
          {'offer__bookmark-button--active': isFavoriteOffer && isOfferFullCard})
      }
      type="button"
      onClick={onFavoriteClick}
    >
      <svg className={`${isOfferFullCard ? 'offer' : 'place-card'}__bookmark-icon`} width={isOfferFullCard ? 31 : 18} height={isOfferFullCard ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
