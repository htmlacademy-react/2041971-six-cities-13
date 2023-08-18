import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferIdProcess } from '../../types/state';
import { fetchOfferByIdAction, fetchNearbyOffersAction, fetchCommentsAction, fetchSendCommentAction, fetchChangeStatusFavoriteAction } from '../api-actions';

const initialState: OfferIdProcess = {
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

export const offerIdProcess = createSlice({
  name: NameSpace.OfferById,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(fetchSendCommentAction.pending, (state) => {
        state.isCommentSending = true;
        state.hasError = false;
      })
      .addCase(fetchSendCommentAction.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.isCommentSending = false;
      })
      .addCase(fetchSendCommentAction.rejected, (state) => {
        state.isCommentSending = false;
        state.hasError = true;
      }).addCase(fetchChangeStatusFavoriteAction.fulfilled, (state) => {
        state.offer = {...state.offer,
          isFavorite: !state.offer?.isFavorite
        };
      });
  }
});
