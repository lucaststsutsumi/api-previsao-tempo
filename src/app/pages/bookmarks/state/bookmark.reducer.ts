import { Action, createReducer, on } from '@ngrx/store';
import { Bookmark } from '../../../shared/models/bookmark.model';
import * as fromBookmarkActions from './bookmark.actions';
import * as fromHomeActions from '../../home/state/home.actions';

export interface BookmarkState {
  list: Bookmark[];
}

export const BookmarkInicialState: BookmarkState = {
  list: [],
};


const reducer = createReducer(
  BookmarkInicialState,
  on(fromHomeActions.toogleBookmark, (state, { entity }) => ({
    ...state,
    list: toogleBookmark(state.list, entity)
  })),

  on(fromBookmarkActions.removeBookmark, (state, { id }) => ({
    ...state,
    list: state.list.filter(item => item.id !== id)
  })),
  on(fromBookmarkActions.updateBookmarksList, (state, { list }) => ({
    ...state,
    list
  }))
);

export function bookmarksReducer(state: BookmarkState | undefined, action: Action): BookmarkState {
  return reducer(state, action);
}

export function toogleBookmark(list: Bookmark[], entitiy: Bookmark): Bookmark[] {

  if (!!list.find(item => item.id === entitiy.id)) {
    return list = list.filter(item => item.id !== entitiy.id);
  }
  return [...list, entitiy];
}
