import { ConfigState } from './config.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectConfigState = createFeatureSelector<ConfigState>('config');

export const selectConfigUnit = createSelector(selectConfigState, (state: ConfigState) => state.unit);
