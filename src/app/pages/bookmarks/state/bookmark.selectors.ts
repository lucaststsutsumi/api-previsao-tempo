import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Bookmark } from './../../../shared/models/bookmark.model';
import { BookmarkState } from './bookmark.reducer';

export const selectBookmarkState = createFeatureSelector<BookmarkState>('bookmarks');

export const selectBookmark = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.list
);

export const selectBookmarkById = createSelector(
  selectBookmark,
  (state: Bookmark[], props: any) => state.find(item => item.id === props.id)
);

