import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DetailsState } from './details.reducer';


export const selectDetailsState = createFeatureSelector<DetailsState>('details');

export const selectDetailsStateEntity = createSelector(
  selectDetailsState,
  (detailState: DetailsState) => detailState.entity
);

export const selectDetailsStateEntityLoading = createSelector(
  selectDetailsState,
  (detailsState: DetailsState) => detailsState.loading
);

export const selectDetailsStateEntityError = createSelector(
  selectDetailsState,
  (detailsState: DetailsState) => detailsState.error
);
