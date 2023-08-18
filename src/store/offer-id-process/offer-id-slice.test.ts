import { offerIdProcess } from './offer-id-process.slice';
import { makeFakeComment, makeFakeFullOffer, makeFakeOffers, makeFakeReviews } from '../../utils/mock';
import { fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction, fetchSendCommentAction } from '../api-actions';

const fakeOffer = makeFakeFullOffer();
const fakeNearby = makeFakeOffers();
const fakeReviews = makeFakeReviews();
const fakeComment = makeFakeComment();

describe('OfferIdProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: fakeOffer,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty axtion and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDataLoading" to "true", "hasError" to "false" with "fetchOfferByIdAction.panding"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: true,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchOfferByIdAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isNearbyLoading" to "true", "hasError" to "false" with "fetchNearbyOffersAction.panding"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: true,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchNearbyOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentsLoading" to "true", "hasError" to "false" with "fetchCommentsAction.panding"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: true,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchCommentsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentSending" to "true", "hasError" to "false" with "fetchSendCommentAction.panding"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: true,
      nearbyOffers: [],
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchSendCommentAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to object of offer, "isOfferDataLoading" to "false" with "fetchOfferByIdAction.fullfilled"', () => {
    const expectedState = {
      offer: fakeOffer,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchOfferByIdAction.fulfilled(fakeOffer, '', fakeOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyOffers" to array of offer, "isNearbyLoading" to "false" with "fetchNearbyOffersAction.fullfilled"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: fakeNearby,
      comments: [],
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchNearbyOffersAction.fulfilled(fakeNearby, '', fakeOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "comments" to array of comments, "isCommentsLoading" to "false" with "fetchCommentsAction.fullfilled"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: fakeReviews,
      comment: null,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchCommentsAction.fulfilled(fakeReviews, '', fakeOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "comment" to object of comment, "isCommentSending" to "false" with "fetchSendCommentAction.fullfilled"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: fakeComment,
      hasError: false,
    };
    const result = offerIdProcess.reducer(undefined, fetchSendCommentAction.fulfilled(fakeComment, '', {rating: fakeComment.ratingData, comment: fakeComment.comment, id: fakeOffer.id}));
    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDataLoading" to "false", "hasError" to "true" with "fetchOfferByIdAction.rejected"', () => {
    const expectedState = {
      offer: null,
      isOfferDataLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSending: false,
      nearbyOffers: [],
      comments: [],
      comment: fakeComment,
      hasError: true,
    };
    const result = offerIdProcess.reducer(undefined, fetchOfferByIdAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
