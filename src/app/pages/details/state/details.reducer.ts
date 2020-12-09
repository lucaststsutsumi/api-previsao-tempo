import { CityDailyWeather } from './../../../shared/models/weather.model';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromDetailsActions from './details.actions';

export interface DetailsState {
  entity: any;
  loading: boolean;
  error: boolean;
}

export const DetailsInicialState: DetailsState = {
  entity: undefined,
  loading: false,
  error: false
};

const reducer = createReducer(
  DetailsInicialState,
  on(fromDetailsActions.loadWeatherDetails, state => ({
    ...state,
    loading: true,
    error: false
  })),
  on(fromDetailsActions.loadWeatherDetailsSuccess, (state, { entity }) => ({
    ...state,
    entity,
    loading: false
  })),
  on(fromDetailsActions.loadWeatherDetailsFailed, (state) => ({
    ...state,
    loading: false,
    error: true
  }))
);

export function detailsReducer(state: DetailsState | undefined, action: Action): DetailsState {
  return reducer(state, action);
}
