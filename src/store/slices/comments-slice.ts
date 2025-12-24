import {createSlice} from '@reduxjs/toolkit';
import {Review} from '../../types/review';
import {fetchCommentsAction, fetchOfferAction} from '../actions/api-actions';

type CommentsState = {
  comments: Review[];
};

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.comments = [];
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export default commentsSlice.reducer;
