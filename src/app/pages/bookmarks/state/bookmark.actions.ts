import { Bookmark } from '../../../shared/models/bookmark.model';
import { createAction, props } from '@ngrx/store';

export const removeBookmark = createAction(
  '[Bookmarks] Remove Bookmarks',
  props<{ id: number }>()
);

export const toogleBookmarkByGeoId = createAction('[Bookmark] Toogle Bookmark By GeoId', props<{ id: number }>())

export const updateBookmarksList = createAction(
  '[Bookmarks] Update Bookmarks List',
  props<{ list: Bookmark[] }>(),
);
