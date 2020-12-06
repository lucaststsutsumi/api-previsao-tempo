import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectCurrentWeater = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.entity
);

export const selectCurrentWeaterLoading = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.loading
);

export const selectCurrentWeaterError = createSelector(
  selectHomeState,
  (homeState: HomeState) => homeState.error
);
