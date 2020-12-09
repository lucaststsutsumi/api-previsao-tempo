import { RouterReducerState } from '@ngrx/router-store';
import { RouterState } from './router.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRouterReducerState = createFeatureSelector<RouterReducerState<RouterState>>('router');

export const selectRouterState = createSelector(
  selectRouterReducerState,
  (routerReducerState: RouterReducerState<RouterState>) => (routerReducerState && routerReducerState.state) || {});

export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (routerState: RouterState) => (routerState && routerState.queryParams) || {});

