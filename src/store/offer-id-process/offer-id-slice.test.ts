import { offerIdProcess } from './offer-id-process.slice';
import { makeFakeComment, makeFakeFullOffer, makeFakeOffer, makeFakeOffers, makeFakeReviews } from '../../utils/mock';
import { fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction, fetchSendCommentAction,
  //fetchChangeStatusFavoriteAction
} from '../api-actions';

const fakeOffer = makeFakeOffer();
const fakeFullOffer = makeFakeFullOffer();
const fakeNearby = makeFakeOffers();
const fakeReviews = makeFakeReviews();
const fakeComment = makeFakeComment();

describe('OfferIdProcess Slice', () => {
  const initialState = {
    offer: null,
    isOfferDataLoading: false,
    isCommentsLoading: false,
    nearbyOffers: [],
    comments: [],
    comment: null,
    hasOfferError: false,
    hasNearbyError: false,
    hasCommentsLoadingError: false,
    hasCommentSendingError: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...initialState,
      offer: fakeFullOffer,
      nearbyOffers: fakeNearby,
      comments: fakeReviews,
      comment: fakeComment,
    };
    const result = offerIdProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty axtion and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = initialState;
    const result = offerIdProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDataLoading" to "true", "hasOfferError" to "false" with "fetchOfferByIdAction.panding"', () => {
    const expectedState = {
      ...initialState,
      isOfferDataLoading: true,
      hasOfferError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchOfferByIdAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "hasNearbyError" to "false" with "fetchNearbyOffersAction.panding"', () => {
    const expectedState = {
      ...initialState,
      hasNearbyError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchNearbyOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentsLoading" to "true", "hasCommentsLoadingError" to "false" with "fetchCommentsAction.panding"', () => {
    const expectedState = {
      ...initialState,
      isCommentsLoading: true,
      hasCommentsLoadingError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchCommentsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "hasCommentSendingError" to "false" with "fetchSendCommentAction.panding"', () => {
    const expectedState = {
      ...initialState,
      hasCommentSendingError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchSendCommentAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to object of offer, "isOfferDataLoading" to "false" with "fetchOfferByIdAction.fullfilled"', () => {
    const expectedState = {
      ...initialState,
      offer: fakeFullOffer,
      isOfferDataLoading: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchOfferByIdAction.fulfilled(fakeFullOffer, '', fakeOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" to array of offer, with "fetchNearbyOffersAction.fullfilled"', () => {
    const expectedState = {
      ...initialState,
      nearbyOffers: fakeNearby,
    };
    const result = offerIdProcess.reducer(undefined, fetchNearbyOffersAction.fulfilled(fakeNearby, '', fakeOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "comments" to array of comments, "isCommentsLoading" to "false" with "fetchCommentsAction.fullfilled"', () => {
    const expectedState = {
      ...initialState,
      isCommentsLoading: false,
      comments: fakeReviews,
    };
    const result = offerIdProcess.reducer(undefined, fetchCommentsAction.fulfilled(fakeReviews, '', fakeOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "comment" to object of comment with "fetchSendCommentAction.fullfilled"', () => {
    const expectedState = {
      ...initialState,
      comment: fakeComment,
    };
    const result = offerIdProcess.reducer(undefined, fetchSendCommentAction.fulfilled(fakeComment, '', {rating: fakeComment.ratingData, comment: fakeComment.comment, id: fakeOffer.id}));
    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDataLoading" to "false", "hasOfferError" to "true" with "fetchOfferByIdAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      isOfferDataLoading: false,
      hasOfferError: true,
    };
    const result = offerIdProcess.reducer(undefined, fetchOfferByIdAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "hasNearbyError" to "true" with "fetchNearbyOffersAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      hasNearbyError: true,
    };
    const result = offerIdProcess.reducer(undefined, fetchNearbyOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentsLoading" to "false", "hasCommentsLoadingError" to "true" with "fetchCommentsAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      isCommentsLoading: false,
      hasCommentsLoadingError: true,
    };
    const result = offerIdProcess.reducer(undefined, fetchCommentsAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "hasCommentSendingError" to "true" with "fetchSendCommentAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      hasCommentSendingError: true,
    };
    const result = offerIdProcess.reducer(undefined, fetchSendCommentAction.rejected);
    expect(result).toEqual(expectedState);
  });

  // it('should set "offer" to object of offer "nearbyOffers" to array of offer,  with "fetchChangeStatusFavoriteAction.fulfilled"', () => {
  //   const expectedState = {
  //     ...initialState,
  //     offer: {
  //       ...fakeFullOffer,
  //       isFavorite: !fakeOffer.isFavorite,
  //     },
  //     nearbyOffers: {
  //       ...fakeNearby,
  //     }
  //   };
  //   const result = offerIdProcess.reducer(undefined, fetchChangeStatusFavoriteAction.fulfilled(fakeOffer, '',{status: Number(!fakeOffer.isFavorite), id: fakeOffer.id}));
  //   expect(result).toEqual(expectedState);
  // });
});
